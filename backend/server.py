from __future__ import annotations
from fastapi import FastAPI

from fastapi import Body
from datetime import datetime



import logging

# configura logging global
logging.basicConfig(
    level=logging.INFO,  # ou DEBUG se quiser mais detalhes
    format="%(asctime)s [%(levelname)s] %(message)s",
)

logger = logging.getLogger(__name__)

from sms_router import router as sms_router
import base64
import io
import logging
import os
from datetime import datetime
from pathlib import Path
from typing import List

from bson import Binary, ObjectId
from fastapi import APIRouter, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorGridFSBucket

# importa do novo db.py
from db import get_database

# importa modelos
from mongo_models import (
    CandidateCreate, CandidateUpdate, CandidateOut,
    CategoryCreate, CategoryUpdate, CategoryOut,
    EventCreate, EventUpdate, EventOut,
    JurorCreate, JurorUpdate, JurorOut,
    DocumentCreate, DocumentUpdate, DocumentOut,
    EvaluationCreate, EvaluationUpdate, EvaluationOut,
    ResultCreate, ResultUpdate, ResultOut,
    ensure_indexes,
)

# importa o router de documentos
from documentos_router import documentos_router
# importa o router de CRUD (candidatos, categorias, etc.)
from routes_crud import router as crud_router

ROOT_DIR = Path(__file__).parent
UPLOAD_ROOT = Path(ROOT_DIR) / "categorias"
UPLOAD_ROOT.mkdir(exist_ok=True)  # cria pasta raiz

app = FastAPI(title="PRENTMA API", description="Backend API for PRENTMA", version="1.0.0")
api_router = APIRouter(prefix="/api")
app.include_router(sms_router)

logger = logging.getLogger("prentma.backend")
logging.basicConfig(level=logging.INFO)

# ───────────────────────────────────────────────
# Rotas básicas de exemplo
# ───────────────────────────────────────────────

@api_router.get("/", summary="API health-check")
async def root():
    return {"message": "PRENTMA backend is running"}

api_router.post("/support", status_code=201)
async def support_message(payload: dict = Body(...)):
    """
    Recebe mensagem do formulário de suporte e grava no MongoDB.
    """
    database = get_database()

    # Adiciona timestamp
    payload["created_at"] = datetime.utcnow()

    # Insere no Mongo (coleção 'support')
    await database.support.insert_one(payload)

    # Você pode também disparar um email aqui se quiser
    return {"message": "Mensagem recebida com sucesso"}

# ───────────────────────────────────────────────
# SUBMISSÃO DE CANDIDATURA
# ───────────────────────────────────────────────
@api_router.post("/applications", status_code=201)
async def create_application(payload: dict):
    """
    Recebe os dados do formulário (payload) e grava no MongoDB.
    """
    database = get_database()
    applications = database.applications

    # monta o documento básico
    application_doc = {
        "first_name": payload.get("first_name"),
        "last_name": payload.get("last_name"),
        "email": payload.get("email"),
        "phone": payload.get("phone"),
        "city": payload.get("city"),
        "address": payload.get("address"),
        "category": payload.get("category"),
        "years_experience": payload.get("years_experience"),
        "municipality": payload.get("municipality"),
        "accepted_terms": payload.get("accepted_terms"),
        "documents": [],
        "created_at": datetime.utcnow(),
    }

    # salva aplicação
    result = await applications.insert_one(application_doc)
    application_id = result.inserted_id

    # grava documentos se houver
    documents_collection = database.application_documents
    docs_payload = payload.get("documents", [])
    docs_meta = []

    for document in docs_payload:
        # decode base64
        file_bytes = base64.b64decode(document["data"])
        candidate_name = f"{payload.get('first_name','')}_{payload.get('last_name','')}".strip().replace(" ", "_")
        category_name = payload.get("category", "SemCategoria").replace(" ", "_")

        # cria pastas conforme categoria/nome candidato
        candidate_folder = UPLOAD_ROOT / category_name / candidate_name
        candidate_folder.mkdir(parents=True, exist_ok=True)

        # salva arquivo fisicamente
        filename = document["name"]
        file_path = candidate_folder / filename
        with open(file_path, "wb") as f:
            f.write(file_bytes)

        # só metadados no Mongo
        stored_document = {
            "_id": ObjectId(),
            "application_id": application_id,
            "type": document["type"],
            "name": filename,
            "category": payload.get("category"),
            "candidate_name": f"{payload.get('first_name','')} {payload.get('last_name','')}",
            "content_type": document.get("content_type") or "application/octet-stream",
            "size": document.get("size"),
            "file_path": str(file_path),  # caminho físico no servidor
            "uploaded_at": datetime.utcnow(),
        }
        await documents_collection.insert_one(stored_document)

        docs_meta.append(
            {
                "id": str(stored_document["_id"]),
                "type": stored_document["type"],
                "name": stored_document["name"],
                "category": stored_document["category"],
                "candidate_name": stored_document["candidate_name"],
                "content_type": stored_document["content_type"],
                "size": stored_document["size"],
                "download_url": f"/api/applications/{application_id}/documents/{stored_document['_id']}",
            }
        )

    if docs_meta:
        await applications.update_one(
            {"_id": application_id},
            {"$set": {"documents": docs_meta}},
        )
        application_doc["documents"] = docs_meta

    application_doc["_id"] = application_id
    return {"message": "Candidatura criada com sucesso", "id": str(application_id)}

# ───────────────────────────────────────────────
# LISTAR TODAS AS CANDIDATURAS
# ───────────────────────────────────────────────
@api_router.get("/applications")
async def list_applications(limit: int = 50):
    """
    Lista candidaturas recentes com metadados.
    """
    database = get_database()
    cursor = database.applications.find().sort("created_at", -1).limit(limit)
    apps = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        apps.append(doc)
    return apps

# ───────────────────────────────────────────────
# LISTAR DOCUMENTOS DE UMA CANDIDATURA
# ───────────────────────────────────────────────
@api_router.get("/applications/{application_id}/documents")
async def list_application_documents(application_id: str):
    """
    Lista documentos vinculados a uma candidatura.
    """
    database = get_database()
    object_id = ObjectId(application_id)
    app = await database.applications.find_one({"_id": object_id})
    if not app:
        raise HTTPException(status_code=404, detail="Candidatura não encontrada")
    return app.get("documents", [])

# ───────────────────────────────────────────────
# DOWNLOAD DE DOCUMENTO ESPECÍFICO
# ───────────────────────────────────────────────
@api_router.get("/applications/{application_id}/documents/{document_id}")
async def download_application_document(application_id: str, document_id: str):
    """
    Faz download de um documento específico de uma candidatura.
    """
    database = get_database()
    app_oid = ObjectId(application_id)
    doc_oid = ObjectId(document_id)

    # busca na collection application_documents
    document = await database.application_documents.find_one(
        {"_id": doc_oid, "application_id": app_oid}
    )
    if not document:
        raise HTTPException(status_code=404, detail="Documento não encontrado")

    # 1) se arquivo gravao fisicamente no servidor
    file_path = document.get("file_path")
    if file_path and os.path.exists(file_path):
        filename = document.get("name") or Path(file_path).name
        headers = {"Content-Disposition": f"attachment; filename=\"{filename}\""}
        return StreamingResponse(
            open(file_path, "rb"),
            media_type=document.get("content_type") or "application/octet-stream",
            headers=headers,
        )

    # 2) se arquivo foi migrado para GridFS (campo file_id)
    file_id = document.get("file_id")
    if file_id:
        bucket = AsyncIOMotorGridFSBucket(database)
        buffer = io.BytesIO()
        try:
            await bucket.download_to_stream(file_id, buffer)
        except Exception:
            raise HTTPException(status_code=404, detail="Arquivo GridFS não encontrado")
        buffer.seek(0)
        filename = document.get("name") or document.get("originalName") or str(file_id)
        headers = {"Content-Disposition": f"attachment; filename=\"{filename}\""}
        return StreamingResponse(
            buffer,
            media_type=document.get("content_type") or "application/octet-stream",
            headers=headers,
        )

    # 3) fallback: se ainda existir campo 'data' com BinData
    data_field = document.get("data")
    if data_field is not None:
        if isinstance(data_field, Binary):
            payload = bytes(data_field)
        elif isinstance(data_field, (bytes, bytearray)):
            payload = bytes(data_field)
        else:
            payload = base64.b64decode(data_field)

        buffer = io.BytesIO(payload)
        buffer.seek(0)
        filename = document.get("name") or document.get("originalName") or document_id
        headers = {"Content-Disposition": f"attachment; filename=\"{filename}\""}
        return StreamingResponse(
            buffer,
            media_type=document.get("content_type") or "application/octet-stream",
            headers=headers,
        )

    raise HTTPException(status_code=404, detail="Arquivo não encontrado")

# ───────────────────────────────────────────────
# CRUD CATEGORIAS (exemplo)
# ───────────────────────────────────────────────
@api_router.post("/categories", response_model=CategoryOut, status_code=201, tags=["categorias"])
async def create_category(payload: CategoryCreate):
    database = get_database()
    category_doc = payload.model_dump()
    category_doc["created_at"] = datetime.utcnow()
    category_doc["updated_at"] = datetime.utcnow()
    result = await database.categories.insert_one(category_doc)
    category_doc["_id"] = result.inserted_id
    return CategoryOut.model_validate(category_doc)

@api_router.get("/categories", response_model=List[CategoryOut], tags=["categorias"])
async def list_categories():
    database = get_database()
    cursor = database.categories.find().sort("created_at", -1)
    items: List[CategoryOut] = []
    async for doc in cursor:
        items.append(CategoryOut.model_validate(doc))
    return items

@api_router.get("/categories/{category_id}", response_model=CategoryOut, tags=["categorias"])
async def get_category(category_id: str):
    database = get_database()
    category = await database.categories.find_one({"_id": ObjectId(category_id)})
    if category is None:
        raise HTTPException(status_code=404, detail="Categoria nao encontrada")
    return CategoryOut.model_validate(category)

from fastapi import Body
from datetime import datetime

@api_router.post("/support", status_code=201)
async def support_message(payload: dict = Body(...)):
    database = get_database()

    payload["created_at"] = datetime.utcnow()
    await database.support.insert_one(payload)

    return {"message": "Mensagem recebida com sucesso"}


# ───────────────────────────────────────────────
# Inclui routers no app
# ───────────────────────────────────────────────
app.include_router(api_router)
app.include_router(documentos_router)
app.include_router(crud_router, prefix="/api")

# ───────────────────────────────────────────────
# Configurações CORS
# ───────────────────────────────────────────────
allowed_origins = os.getenv("CORS_ORIGINS", "*")
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[origin.strip() for origin in allowed_origins.split(",") if origin.strip()],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ───────────────────────────────────────────────
# Eventos de inicialização e encerramento
# ───────────────────────────────────────────────
@app.on_event("startup")
async def startup_event():
    database = get_database()
    try:
        await database.command("ping")
        await ensure_indexes(database)
        logger.info("Connected to MongoDB")
    except Exception as exc:
        logger.exception("Unable to reach MongoDB")
        raise RuntimeError("Cannot connect to MongoDB") from exc

@app.on_event("shutdown")
async def shutdown_event():
    from db import client
    if client is not None:
        client.close()
        logger.info("MongoDB connection closed")

# ───────────────────────────────────────────────
# Main para rodar direto com python server.py
# ───────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn

    reload_flag = os.getenv("RELOAD", "false").lower() in {"1", "true", "yes"}
    uvicorn.run("server:app", host=os.getenv("HOST", "0.0.0.0"), port=int(os.getenv("PORT", 8000)), reload=reload_flag)
   

