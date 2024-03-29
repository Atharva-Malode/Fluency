from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from models import User
from dotenv import load_dotenv
import os
import jwt
from cam import pose

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

exam = APIRouter()

@exam.get("/start_exam")
def start_exam(token: str = Depends(oauth2_scheme)):
    try:
        pose(token)
        return {"message": "Exam started successfully"}
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    except User.DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")