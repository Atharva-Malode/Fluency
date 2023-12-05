
from fastapi import FastAPI, HTTPException
from mongoengine import connect
from models import User, NewUser, Question, test, QuestionRequest, AddQuestionRequest
import json
from datetime import timedelta
from pass_hash import get_password_hash
from user_auth import authenticate_user
from accese_token import create_access_token, SECRET_KEY, ALGORITHM
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends
from jose import jwt
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from add_question import add_question_to_user
from add_points import add_points_to_user
from next_question import next_question
from fastapi import status

app = FastAPI()
connect("Language", host="localhost", port=27017)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/check_users")
def get_users():
    check = json.loads(User.objects().to_json())
    return {"message": check}

@app.post("/signup")
def sign_up(new_user: NewUser):
    if(User.objects.filter(username=new_user.username).count() > 0):
      return {"message": "User already exists"}
    user = User(username=new_user.username, password=get_password_hash(new_user.password),total_points=0,language=new_user.language)
    user.save()
    return {"message": "Signup successful"}


@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends() ):
    #,user : UserLogin
    username = form_data.username
    password = form_data.password

    if authenticate_user(username, password):
       accese_token = create_access_token(data={"sub": username},expires_delta=timedelta(minutes=30))
       return {"access_token": accese_token, "token_type": "bearer"}
    else:
         raise HTTPException(status_code=400, detail="Incorrect username or password")
         # return {"message": "Incorrect username or password"
    # return {"message": "Login successful"}

@app.get("/user_data")
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

from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional



@app.post("/add_question")
def add_question(
    request_data: AddQuestionRequest,
    token: str = Depends(oauth2_scheme),
):
    try:
        # Retrieve values from request_data
        question = request_data.question
        answer = request_data.answer
        time_seconds = request_data.time_seconds
        points = request_data.points
        
        # Assuming these functions exist to add question and points
        add_question_to_user(token, question, answer, time_seconds, points)
        add_points_to_user(token, points)
        
        return {"message": "Question added"}
    except KeyError as ke:
        raise HTTPException(status_code=422, detail=f"Invalid data format: {str(ke)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")




@app.post("/question")
def get_question(request: QuestionRequest, token: str = Depends(oauth2_scheme)):
    try:
        if request.question_no < 0 or request.question_no >= len(test.objects.get(no=1).questions):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Invalid question number provided: {request.question_no}.",
            )

        if request.question_no == 0:
            return {"message": test.objects.get(no=1).questions[0]}

        check = next_question(request.old_level, request.question_no, request.old_answer)
        return {"message": check}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing request: {str(e)}",
        )


@app.get("/leaderboard")
def get_leaderboard():
    try:
        Leaderboard = User.objects.only("username", "total_points").order_by("-total_points")
        leaderboard_data = [
            {"username": user.username, "total_points": user.total_points}
            for user in Leaderboard
        ]
        return {"message": leaderboard_data}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing request: {str(e)}",
        )