from datetime import datetime
from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field, GetCoreSchemaHandler, GetJsonSchemaHandler
from pydantic_core import core_schema

from pydantic import BaseModel, EmailStr
from datetime import datetime

# ───────────────────────────────────────────────
# ObjectId compatível com Pydantic v2
# ───────────────────────────────────────────────
class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler: GetCoreSchemaHandler):
        return core_schema.no_info_after_validator_function(
            cls.validate,
            core_schema.union_schema(
                [
                    core_schema.is_instance_schema(ObjectId),
                    core_schema.str_schema(),
                ]
            ),
        )

    @classmethod
    def validate(cls, v):
        if isinstance(v, ObjectId):
            return v
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, schema, handler: GetJsonSchemaHandler):
        json_schema = handler(schema)
        json_schema.update(type="string")
        return json_schema


# ───────────────────────────────────────────────
# CREATE MODELS
# ───────────────────────────────────────────────
class CandidateCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    identityDocument: str
    categoryId: PyObjectId
    registrationStatus: str
    registrationDate: datetime = Field(default_factory=datetime.utcnow)

class CategoryCreate(BaseModel):
    name: str
    description: str
    prize: str

class EventCreate(BaseModel):
    name: str
    description: str
    startDate: datetime
    endDate: datetime
    location: str

class JurorCreate(BaseModel):
    name: str
    email: EmailStr
    specialty: str

class DocumentCreate(BaseModel):
    candidateId: PyObjectId
    type: str
    originalName: str
    fileUrl: str
    uploadDate: datetime = Field(default_factory=datetime.utcnow)
    status: str = "received"
    description: Optional[str] = None
    data: Optional[bytes] = None

class EvaluationCreate(BaseModel):
    candidateId: PyObjectId
    jurorId: PyObjectId
    score: float
    comment: str
    date: datetime = Field(default_factory=datetime.utcnow)

class ResultCreate(BaseModel):
    candidateId: PyObjectId
    categoryId: PyObjectId
    position: int
    prize: str


# ───────────────────────────────────────────────
# UPDATE MODELS (tudo opcional)
# ───────────────────────────────────────────────
class CandidateUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    phone: Optional[str]
    identityDocument: Optional[str]
    categoryId: Optional[PyObjectId]
    registrationStatus: Optional[str]
    registrationDate: Optional[datetime]

class CategoryUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    prize: Optional[str]

class EventUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    startDate: Optional[datetime]
    endDate: Optional[datetime]
    location: Optional[str]

class JurorUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    specialty: Optional[str]

class DocumentUpdate(BaseModel):
    candidateId: Optional[PyObjectId]
    type: Optional[str]
    originalName: Optional[str]
    fileUrl: Optional[str]
    uploadDate: Optional[datetime]
    status: Optional[str]
    description: Optional[str]
    data: Optional[bytes]

class EvaluationUpdate(BaseModel):
    candidateId: Optional[PyObjectId]
    jurorId: Optional[PyObjectId]
    score: Optional[float]
    comment: Optional[str]
    date: Optional[datetime]

class ResultUpdate(BaseModel):
    candidateId: Optional[PyObjectId]
    categoryId: Optional[PyObjectId]
    position: Optional[int]
    prize: Optional[str]


# ───────────────────────────────────────────────
# OUT MODELS
# ───────────────────────────────────────────────
class CandidateOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    name: str
    email: EmailStr
    phone: str
    identityDocument: str
    categoryId: PyObjectId
    registrationStatus: str
    registrationDate: datetime

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True

class CategoryOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    name: str
    description: str
    prize: str

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True

class EventOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    name: str
    description: str
    startDate: datetime
    endDate: datetime
    location: str

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True

class JurorOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    name: str
    email: EmailStr
    specialty: str

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True

class DocumentOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    candidateId: PyObjectId
    type: str
    originalName: str
    fileUrl: str
    uploadDate: datetime
    status: str
    description: Optional[str] = None

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True

class EvaluationOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    candidateId: PyObjectId
    jurorId: PyObjectId
    score: float
    comment: str
    date: datetime

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True

class ResultOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    candidateId: PyObjectId
    categoryId: PyObjectId
    position: int
    prize: str

    class Config:
        json_encoders = {ObjectId: str}
        populate_by_name = True


class SupportMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime = datetime.utcnow()


# ───────────────────────────────────────────────
# FUNÇÃO PARA CRIAR ÍNDICES
# ───────────────────────────────────────────────
async def ensure_indexes(database):
    """
    Cria índices recomendados para performance e integridade.
    Chame no startup_event do FastAPI.
    """
    # Documentos indexados por candidato e tipo
    await database.documentos.create_index([("candidateId", 1), ("type", 1)])
    # Email único para candidatos e jurados
    await database.candidatos.create_index("email", unique=True)
    await database.jurados.create_index("email", unique=True)
