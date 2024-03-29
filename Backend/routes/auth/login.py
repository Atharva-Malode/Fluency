

from fastapi import APIRouter
from routes.auth.authenticate.user_auth import authenticate_user
from routes.auth.authenticate.accese_token import create_access_token
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException
from datetime import timedelta
import jwt
from dotenv import load_dotenv
import os
from routes.auth.authenticate.check_warning import check_warning

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")



Login = APIRouter()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@Login.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends() ):
    
    username = form_data.username
    password = form_data.password

    if authenticate_user(username, password):
       accese_token = create_access_token(data={"sub": username},expires_delta=timedelta(days=20))
       allowed = check_warning(accese_token)
       return {"access_token": accese_token, "token_type": "bearer", "allowed": allowed}
    else:
         raise HTTPException(status_code=400, detail="Incorrect username or password")