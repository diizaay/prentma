# sms_router.py
from fastapi import APIRouter
import httpx
import os
import logging

router = APIRouter(prefix="/api", tags=["sms"])

# Configuração do logger (para ver no terminal)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("sms")

# Usa a chave QAS (sandbox)
TELCOSMS_API_KEY = os.getenv("TELCOSMS_QAS_KEY", "qas059051b96c15f9b1a1c068827e")
TELCOSMS_URL = "https://www.telcosms.co.ao/send_message"  # endpoint v1

@router.post("/send-sms")
async def send_sms(phone_number: str, message_body: str):
    """
    Envia um SMS (modo teste com QAS).
    """
    payload = {
        "message": 1,
        "api_key_app": TELCOSMS_API_KEY,
        "phone_number": phone_number,
        "message_body": message_body,
    }
    logger.info("Payload TelcoSMS: %s", payload)

    async with httpx.AsyncClient(timeout=10) as client:
        try:
            resp = await client.post(TELCOSMS_URL, json=payload)
            logger.info("Resposta TelcoSMS: %s %s", resp.status_code, resp.text)
            return {
                "status": resp.status_code,
                "response": resp.text,
                "payload": payload
            }
        except Exception as e:
            logger.error("Erro ao enviar SMS: %s", e)
            return {"error": str(e)}
