from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import StreamingResponse
from bson import Binary, ObjectId
from datetime import datetime
import io
import base64

from db import get_database  # usa a função já existente no server.py
from mongo_models import DocumentOut, DocumentCreate, PyObjectId

documentos_router = APIRouter(prefix="/documentos", tags=["documentos"])

# ───────────────────────────────────────────────
# UPLOAD DE DOCUMENTO
# ───────────────────────────────────────────────
@documentos_router.post("/", response_model=DocumentOut, status_code=201)
async def upload_document(
    candidateId: str = Form(...),
    type: str = Form(...),
    description: str = Form(None),
    arquivo: UploadFile = File(...),
):
    database = get_database()
    from fastapi import APIRouter, HTTPException, UploadFile, File, Form
    from fastapi.responses import StreamingResponse
    from bson import ObjectId
    from datetime import datetime
    import io
    import base64

    from db import get_database  # usa a função já existente no server.py
    from mongo_models import DocumentOut, DocumentCreate, PyObjectId
    from motor.motor_asyncio import AsyncIOMotorGridFSBucket

    documentos_router = APIRouter(prefix="/documentos", tags=["documentos"])

    # ───────────────────────────────────────────────
    # UPLOAD DE DOCUMENTO (armazena em GridFS)
    # ───────────────────────────────────────────────
    @documentos_router.post("/", response_model=DocumentOut, status_code=201)
    async def upload_document(
        candidateId: str = Form(...),
        type: str = Form(...),
        description: str = Form(None),
        arquivo: UploadFile = File(...),
    ):
        database = get_database()
        candidate_oid = ObjectId(candidateId)

        # lê bytes do arquivo
        file_bytes = await arquivo.read()
        if not file_bytes:
            raise HTTPException(status_code=400, detail="Arquivo vazio")

        now = datetime.utcnow()

        # armazena arquivo em GridFS para que possa ser baixado pelo MongoDB Compass
        bucket = AsyncIOMotorGridFSBucket(database)
        file_id = await bucket.upload_from_stream(arquivo.filename, file_bytes)

        document_doc = {
            "candidateId": candidate_oid,
            "type": type,
            "originalName": arquivo.filename,
            # expõe rota de download que usa o file_id do GridFS
            "fileUrl": f"/documentos/{str(file_id)}/download",
            "uploadDate": now,
            "status": "received",
            "description": description,
            # guardamos referência ao arquivo no GridFS (ObjectId)
            "file_id": file_id,
            "content_type": arquivo.content_type,
            "created_at": now,
            "updated_at": now,
        }

        result = await database.documentos.insert_one(document_doc)
        document_doc["_id"] = result.inserted_id
        return DocumentOut.model_validate(document_doc)


    # ───────────────────────────────────────────────
    # LISTAR DOCUMENTOS
    # ───────────────────────────────────────────────
    @documentos_router.get("/", response_model=list[DocumentOut])
    async def list_documents(candidateId: str = None):
        database = get_database()
        query = {}
        if candidateId:
            query["candidateId"] = ObjectId(candidateId)

        cursor = database.documentos.find(query).sort("uploadDate", -1)
        docs = []
        async for doc in cursor:
            docs.append(DocumentOut.model_validate(doc))
        return docs


    # ───────────────────────────────────────────────
    # DOWNLOAD DOCUMENTO (lê do GridFS)
    # ───────────────────────────────────────────────
    @documentos_router.get("/{document_id}/download")
    async def download_document(document_id: str):
        database = get_database()
        document = await database.documentos.find_one({"_id": ObjectId(document_id)})
        if not document:
            raise HTTPException(status_code=404, detail="Documento não encontrado")

        file_id = document.get("file_id")
        if not file_id:
            raise HTTPException(status_code=404, detail="Documento sem arquivo no GridFS")

        bucket = AsyncIOMotorGridFSBucket(database)
        buffer = io.BytesIO()
        try:
            await bucket.download_to_stream(file_id, buffer)
        except Exception:
            raise HTTPException(status_code=404, detail="Arquivo GridFS não encontrado")

        buffer.seek(0)
        headers = {
            "Content-Disposition": f"attachment; filename=\"{document.get('originalName') or document_id}\"",
        }
        return StreamingResponse(
            buffer,
            media_type=document.get("content_type") or "application/octet-stream",
            headers=headers,
        )
