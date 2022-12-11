from fastapi import APIRouter
from config.db import conn
from models.index import 
router = APIRouter()

@router.get("/")
async def read_data():
