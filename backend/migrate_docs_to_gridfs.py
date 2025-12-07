"""Migra documentos armazenados no campo `data` da coleção `documentos` para GridFS.
Uso:
    # opcionalmente exportar MONGO_URL
    $env:MONGO_URL = "mongodb://localhost:27017/prentma"
    .venv\Scripts\python.exe migrate_docs_to_gridfs.py

O script faz:
 - busca documentos em `documentos` que têm o campo `data`
 - salva os bytes no GridFS
 - atualiza o documento com `file_id`, `content_type`, e remove `data`
 - imprime um resumo
"""
import os
from pymongo import MongoClient
from bson import ObjectId
from gridfs import GridFS

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/prentma")
print("Conectando em", MONGO_URL)
client = MongoClient(MONGO_URL)
db = client.get_default_database()
fs = GridFS(db)

collections_to_migrate = ["documentos", "application_documents", "documents"]
total = 0

def to_bytes_safe(data):
    # aceita Binary, bytes, bytearray
    try:
        if isinstance(data, (bytes, bytearray)):
            return bytes(data)
        # some Binary objects support buffer protocol
        return bytes(data)
    except Exception:
        return None

for coll_name in collections_to_migrate:
    col = db[coll_name]
    cursor = col.find({"data": {"$exists": True}})
    migrated = 0
    print(f"Processando coleção {coll_name}...")
    for doc in cursor:
        doc_id = doc.get("_id")
        data = doc.get("data")
        if data is None:
            continue
        file_bytes = to_bytes_safe(data)
        if file_bytes is None:
            print(f"  - Pular {doc_id}: não foi possível converter 'data' para bytes")
            continue

        filename = doc.get("originalName") or doc.get("name") or str(doc_id)
        content_type = doc.get("content_type") or doc.get("contentType") or "application/octet-stream"

        # grava no GridFS
        file_id = fs.put(file_bytes, filename=filename, contentType=content_type)

        # atualiza documento: adiciona file_id (ObjectId) e remove data
        update = {
            "$set": {"file_id": file_id, "content_type": content_type},
            "$unset": {"data": ""},
        }
        col.update_one({"_id": doc_id}, update)
        migrated += 1
        total += 1
        print(f"  - Migrado {doc_id} -> file_id {file_id}")

    print(f"Coleção {coll_name}: migrados {migrated} documentos")

print(f"Total migrado em todas coleções: {total}")
client.close()
