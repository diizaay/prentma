"""
Pequeno script para inspecionar as coleções do Mongo usadas pelo projeto.
Ele não altera nada — só imprime contagens e um documento de exemplo por coleção.
Uso:
    set MONGO_URL="mongodb://localhost:27017/prentma"
    .venv\Scripts\python.exe inspect_db.py
"""
import os
from pymongo import MongoClient

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/prentma")
client = MongoClient(MONGO_URL)
db = client.get_default_database()

collections = [
    "applications",
    "application_documents",
    "candidatos",
    "categories",
    "documentos",
]

for name in collections:
    col = db[name]
    try:
        count = col.count_documents({})
    except Exception as exc:
        print(f"Erro acessando coleção {name}: {exc}")
        continue
    print(f"Coleção '{name}': {count} documentos")
    sample = col.find_one()
    print("Exemplo:", sample)
    print("-" * 60)

client.close()
