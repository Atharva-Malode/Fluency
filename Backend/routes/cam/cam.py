from fastapi import APIRouter

camrouter = APIRouter()


@camrouter.get("/test")
def read_root():
    return {"message": "The camera API is working completely fine"}