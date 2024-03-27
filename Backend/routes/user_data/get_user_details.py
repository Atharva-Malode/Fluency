from fastapi import APIRouter, HTTPException, Depends
from models import User
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
import os
import jwt
import json

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


UserData = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@UserData.get("/user_data")
def get_user_data(token: str = Depends(oauth2_scheme)):
    decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username = decoded_token.get("sub")

    try:
        user_data = json.loads(User.objects.filter(username=username).to_json())
        if user_data:
            return {"username": username, "data": user_data}
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving data: {str(e)}")