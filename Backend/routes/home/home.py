from fastapi import APIRouter

Home = APIRouter()


@Home.get("/")
def read_root():
    return {"message": "The Endpoint is working and implemented by @atharva-malode in fast api"}