from fastapi import APIRouter
from routes.auth.authenticate.user_auth import authenticate_user
from routes.auth.authenticate.accese_token import create_access_token
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException
from datetime import timedelta


Login = APIRouter()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@Login.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends() ):
    
    username = form_data.username
    password = form_data.password

    if authenticate_user(username, password):
       accese_token = create_access_token(data={"sub": username},expires_delta=timedelta(days=20))
       return {"access_token": accese_token, "token_type": "bearer"}
    else:
         raise HTTPException(status_code=400, detail="Incorrect username or password")