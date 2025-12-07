from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os
from pathlib import Path
import logging

ROOT_DIR = Path(__file__).parent
MONGO_URL = os.getenv("MONGO_URL") or "mongodb://localhost:27017/prentma"
DB_NAME = os.getenv("DB_NAME") or "prentma"

client: AsyncIOMotorClient | None = None
_database: AsyncIOMotorDatabase | None = None

def get_database() -> AsyncIOMotorDatabase:
    global client, _database
    if client is None or _database is None:
        try:
            client = AsyncIOMotorClient(MONGO_URL, uuidRepresentation="standard")
            _database = client[DB_NAME]
        except Exception as exc:
            logging.exception("Failed to create Mongo client")
            raise RuntimeError("Database connection failed") from exc
    return _database
