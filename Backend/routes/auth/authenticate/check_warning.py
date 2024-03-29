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


def check_warning(token: str):
    decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username = decoded_token.get("sub")
    try:
        user_data = User.objects.filter(username=username).first()
        if user_data:
            warnings = user_data.warnings
            if warnings >= 5:
                return True
            else:
                return False
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving data: {str(e)}")


# if __name__ == "__main__":
#     token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjE3MTM0NTYxMTJ9.CRV1OIKZPWSdkM6OeZSdg_Qe-s_ccNMSprCiOEYeQz8"
#     print(check_warning("token"))