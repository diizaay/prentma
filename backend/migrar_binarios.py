import asyncio
import base64
import os
from bson import ObjectId, Binary
from pathlib import Path
from db import get_database

# pasta raiz de uploads igual no server.py
UPLOAD_ROOT = Path(__file__).parent / "categorias"
UPLOAD_ROOT.mkdir(exist_ok=True)

async def migrate():
    """
    Migra arquivos binários (campo data) do MongoDB para o disco do servidor,
    atualizando os documentos com file_path e removendo o campo data.
    """
    db = get_database()
    cursor = db.application_documents.find({"data": {"$exists": True}})

    count = 0
    async for doc in cursor:
        app = await db.applications.find_one({"_id": doc["application_id"]})
        if not app:
            continue

        # monta pasta categoria/nome do candidato
        first_name = app.get("first_name","")
        last_name = app.get("last_name","")
        category = app.get("category","SemCategoria")
        candidate_name = f"{first_name}_{last_name}".replace(" ", "_")
        category_name = category.replace(" ", "_")

        candidate_folder = UPLOAD_ROOT / category_name / candidate_name
        candidate_folder.mkdir(parents=True, exist_ok=True)

        file_path = candidate_folder / doc["name"]

        # pega os bytes do campo data
        data_field = doc["data"]
        if isinstance(data_field, Binary):
            payload = bytes(data_field)
        else:
            payload = base64.b64decode(data_field)

        # grava no disco
        with open(file_path, "wb") as f:
            f.write(payload)

        # atualiza doc no Mongo
        await db.application_documents.update_one(
            {"_id": doc["_id"]},
            {"$unset": {"data": ""}, "$set": {"file_path": str(file_path)}},
        )
        count += 1

    print(f"Migração concluída: {count} arquivos migrados.")

if __name__ == "__main__":
    asyncio.run(migrate())
