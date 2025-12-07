from fastapi import APIRouter, HTTPException
from datetime import datetime
from bson import ObjectId
from pymongo import ReturnDocument
from typing import List

from db import get_database
from mongo_models import (
    CandidateCreate, CandidateOut,
    CategoryCreate, CategoryOut,
    EventCreate, EventOut,
    JurorCreate, JurorOut,
    EvaluationCreate, EvaluationOut,
    ResultCreate, ResultOut,
    PyObjectId
)

router = APIRouter(tags=["CRUD"])


# ───────────────────────────────────────────────
# Helper para validar ObjectId
# ───────────────────────────────────────────────
def parse_object_id(raw_id: str, label: str) -> ObjectId:
    if not ObjectId.is_valid(raw_id):
        raise HTTPException(status_code=400, detail=f"{label} inválido")
    return ObjectId(raw_id)

# ───────────────────────────────────────────────
# CRUD Candidates
# ───────────────────────────────────────────────
@router.post("/candidates", response_model=CandidateOut)
async def create_candidate(payload: CandidateCreate):
    db = get_database()
    doc = payload.dict()
    doc["created_at"] = doc["updated_at"] = payload.registrationDate
    result = await db.candidatos.insert_one(doc)
    doc["_id"] = result.inserted_id
    return CandidateOut(**doc)

@router.get("/candidates", response_model=List[CandidateOut])
async def list_candidates(categoryId: str | None = None):
    db = get_database()
    query = {}
    if categoryId:
        if not PyObjectId.is_valid(categoryId):
            raise HTTPException(status_code=400, detail="categoryId inválido")
        query["categoryId"] = ObjectId(categoryId)

    cursor = db.candidatos.find(query).sort("created_at", -1)
    items = []
    async for doc in cursor:
        items.append(CandidateOut(**doc))
    return items

@router.get("/candidates/{candidate_id}", response_model=CandidateOut)
async def get_candidate(candidate_id: str):
    db = get_database()
    oid = parse_object_id(candidate_id, "Candidato")
    doc = await db.candidatos.find_one({"_id": oid})
    if not doc:
        raise HTTPException(404, "Candidato não encontrado")
    return CandidateOut(**doc)

@router.patch("/candidates/{candidate_id}", response_model=CandidateOut)
async def update_candidate(candidate_id: str, payload: CandidateCreate):
    db = get_database()
    oid = parse_object_id(candidate_id, "Candidato")
    updates = {k: v for k, v in payload.dict().items() if v is not None}
    updates["updated_at"] = payload.registrationDate
    doc = await db.candidatos.find_one_and_update(
        {"_id": oid}, {"$set": updates}, return_document=ReturnDocument.AFTER
    )
    if not doc:
        raise HTTPException(404, "Candidato não encontrado")
    return CandidateOut(**doc)

@router.delete("/candidates/{candidate_id}")
async def delete_candidate(candidate_id: str):
    db = get_database()
    oid = parse_object_id(candidate_id, "Candidato")
    result = await db.candidatos.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Candidato não encontrado")
    return {"status": "deleted"}


# ───────────────────────────────────────────────
# CRUD Categories
# ───────────────────────────────────────────────
@router.post("/categories", response_model=CategoryOut)
async def create_category(payload: CategoryCreate):
    db = get_database()
    doc = payload.dict()
    doc["created_at"] = doc["updated_at"] = doc.get("created_at", None)
    result = await db.categories.insert_one(doc)
    doc["_id"] = result.inserted_id
    return CategoryOut(**doc)

@router.get("/categories", response_model=List[CategoryOut])
async def list_categories():
    db = get_database()
    cursor = db.categories.find().sort("created_at", -1)
    items = []
    async for doc in cursor:
        items.append(CategoryOut(**doc))
    return items

@router.patch("/categories/{category_id}", response_model=CategoryOut)
async def update_category(category_id: str, payload: CategoryCreate):
    db = get_database()
    oid = parse_object_id(category_id, "Categoria")
    updates = {k: v for k, v in payload.dict().items() if v is not None}
    updates["updated_at"] = datetime.utcnow()
    doc = await db.categories.find_one_and_update(
        {"_id": oid}, {"$set": updates}, return_document=ReturnDocument.AFTER
    )
    if not doc:
        raise HTTPException(404, "Categoria não encontrada")
    return CategoryOut(**doc)

@router.delete("/categories/{category_id}")
async def delete_category(category_id: str):
    db = get_database()
    oid = parse_object_id(category_id, "Categoria")
    result = await db.categories.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Categoria não encontrada")
    return {"status": "deleted"}


# ───────────────────────────────────────────────
# CRUD Events
# ───────────────────────────────────────────────
@router.post("/events", response_model=EventOut)
async def create_event(payload: EventCreate):
    db = get_database()
    doc = payload.dict()
    doc["created_at"] = doc["updated_at"] = datetime.utcnow()
    result = await db.events.insert_one(doc)
    doc["_id"] = result.inserted_id
    return EventOut(**doc)

@router.get("/events", response_model=List[EventOut])
async def list_events():
    db = get_database()
    cursor = db.events.find().sort("created_at", -1)
    items = []
    async for doc in cursor:
        items.append(EventOut(**doc))
    return items

@router.patch("/events/{event_id}", response_model=EventOut)
async def update_event(event_id: str, payload: EventCreate):
    db = get_database()
    oid = parse_object_id(event_id, "Evento")
    updates = {k: v for k, v in payload.dict().items() if v is not None}
    updates["updated_at"] = datetime.utcnow()
    doc = await db.events.find_one_and_update(
        {"_id": oid}, {"$set": updates}, return_document=ReturnDocument.AFTER
    )
    if not doc:
        raise HTTPException(404, "Evento não encontrado")
    return EventOut(**doc)

@router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    db = get_database()
    oid = parse_object_id(event_id, "Evento")
    result = await db.events.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Evento não encontrado")
    return {"status": "deleted"}


# ───────────────────────────────────────────────
# CRUD Jurors
# ───────────────────────────────────────────────
@router.post("/jurors", response_model=JurorOut)
async def create_juror(payload: JurorCreate):
    db = get_database()
    doc = payload.dict()
    doc["created_at"] = doc["updated_at"] = datetime.utcnow()
    result = await db.jurados.insert_one(doc)
    doc["_id"] = result.inserted_id
    return JurorOut(**doc)

@router.get("/jurors", response_model=List[JurorOut])
async def list_jurors():
    db = get_database()
    cursor = db.jurados.find().sort("created_at", -1)
    items = []
    async for doc in cursor:
        items.append(JurorOut(**doc))
    return items

@router.patch("/jurors/{juror_id}", response_model=JurorOut)
async def update_juror(juror_id: str, payload: JurorCreate):
    db = get_database()
    oid = parse_object_id(juror_id, "Jurado")
    updates = {k: v for k, v in payload.dict().items() if v is not None}
    updates["updated_at"] = datetime.utcnow()
    doc = await db.jurados.find_one_and_update(
        {"_id": oid}, {"$set": updates}, return_document=ReturnDocument.AFTER
    )
    if not doc:
        raise HTTPException(404, "Jurado não encontrado")
    return JurorOut(**doc)

@router.delete("/jurors/{juror_id}")
async def delete_juror(juror_id: str):
    db = get_database()
    oid = parse_object_id(juror_id, "Jurado")
    result = await db.jurados.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Jurado não encontrado")
    return {"status": "deleted"}


# ───────────────────────────────────────────────
# CRUD Evaluations
# ───────────────────────────────────────────────
@router.post("/evaluations", response_model=EvaluationOut)
async def create_evaluation(payload: EvaluationCreate):
    db = get_database()
    doc = payload.dict()
    doc["created_at"] = doc["updated_at"] = datetime.utcnow()
    result = await db.avaliacoes.insert_one(doc)
    doc["_id"] = result.inserted_id
    return EvaluationOut(**doc)

@router.get("/evaluations", response_model=List[EvaluationOut])
async def list_evaluations():
    db = get_database()
    cursor = db.avaliacoes.find().sort("created_at", -1)
    items = []
    async for doc in cursor:
        items.append(EvaluationOut(**doc))
    return items

@router.patch("/evaluations/{evaluation_id}", response_model=EvaluationOut)
async def update_evaluation(evaluation_id: str, payload: EvaluationCreate):
    db = get_database()
    oid = parse_object_id(evaluation_id, "Avaliacao")
    updates = {k: v for k, v in payload.dict().items() if v is not None}
    updates["updated_at"] = datetime.utcnow()
    doc = await db.avaliacoes.find_one_and_update(
        {"_id": oid}, {"$set": updates}, return_document=ReturnDocument.AFTER
    )
    if not doc:
        raise HTTPException(404, "Avaliacao não encontrada")
    return EvaluationOut(**doc)

@router.delete("/evaluations/{evaluation_id}")
async def delete_evaluation(evaluation_id: str):
    db = get_database()
    oid = parse_object_id(evaluation_id, "Avaliacao")
    result = await db.avaliacoes.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Avaliacao não encontrada")
    return {"status": "deleted"}


# ───────────────────────────────────────────────
# CRUD Results
# ───────────────────────────────────────────────
@router.post("/results", response_model=ResultOut)
async def create_result(payload: ResultCreate):
    db = get_database()
    doc = payload.dict()
    doc["created_at"] = doc["updated_at"] = datetime.utcnow()
    result = await db.resultados.insert_one(doc)
    doc["_id"] = result.inserted_id
    return ResultOut(**doc)

@router.get("/results", response_model=List[ResultOut])
async def list_results():
    db = get_database()
    cursor = db.resultados.find().sort("created_at", -1)
    items = []
    async for doc in cursor:
        items.append(ResultOut(**doc))
    return items

@router.patch("/results/{result_id}", response_model=ResultOut)
async def update_result(result_id: str, payload: ResultCreate):
    db = get_database()
    oid = parse_object_id(result_id, "Resultado")
    updates = {k: v for k, v in payload.dict().items() if v is not None}
    updates["updated_at"] = datetime.utcnow()
    doc = await db.resultados.find_one_and_update(
        {"_id": oid}, {"$set": updates}, return_document=ReturnDocument.AFTER
    )
    if not doc:
        raise HTTPException(404, "Resultado não encontrado")
    return ResultOut(**doc)

@router.delete("/results/{result_id}")
async def delete_result(result_id: str):
    db = get_database()
    oid = parse_object_id(result_id, "Resultado")
    result = await db.resultados.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Resultado não encontrado")
    return {"status": "deleted"}
