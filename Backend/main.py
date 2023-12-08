
from fastapi import FastAPI, HTTPException
from mongoengine import connect
from models import User, NewUser, test, QuestionRequest, AddQuestionRequest
import json
from datetime import timedelta
from pass_hash import get_password_hash
from user_auth import authenticate_user
from accese_token import create_access_token, SECRET_KEY, ALGORITHM
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends
from jose import jwt
from fastapi.middleware.cors import CORSMiddleware
from add_question import add_question_to_user
from add_points import add_points_to_user
from next_question import next_question
from fastapi import status
from dotenv import load_dotenv
import os

#the connection string for mongodb atlas server

load_dotenv() 
mongo_url = os.getenv("MONGODB")


app = FastAPI()  #creating the app


#make sure to change the database name and the port number
# connect("Language", host="localhost", port=27017) #connecting to the database
connect(
    db='Language',
    # host='mongo_url'
    host="add your link here"
)



#to allow the frontend to access the backend CORS is used
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],

)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/")
def read_root():
    return {"message": "The Endpoint is working and implemented by @atharva-malode in fast api"}

#route to signup
@app.post("/signup")
def sign_up(new_user: NewUser):
    if(User.objects.filter(username=new_user.username).count() > 0):
      return {"message": "User already exists"}
    user = User(username=new_user.username, password=get_password_hash(new_user.password),total_points=0,language=new_user.language)
    user.save()
    return {"message": "Signup successful"}


#route to login
@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends() ):
    
    username = form_data.username
    password = form_data.password

    if authenticate_user(username, password):
       accese_token = create_access_token(data={"sub": username},expires_delta=timedelta(days=20))
       return {"access_token": accese_token, "token_type": "bearer"}
    else:
         raise HTTPException(status_code=400, detail="Incorrect username or password")
         # return {"message": "Incorrect username or password"
    # return {"message": "Login successful"}


#route to get the user data
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


#to add the data which user has entered : once submite button is clicked
@app.post("/add_question")
def add_question(
    request_data: AddQuestionRequest,
    token: str = Depends(oauth2_scheme),
):
    try:
        #setting the values of the request data
        question = request_data.question
        answer = request_data.answer
        time_seconds = request_data.time_seconds
        points = request_data.points
        excercise_no = request_data.excercise_no

        # the function are implemented in add_question.py and add_points.py
        add_question_to_user(token, question, answer, time_seconds, points)
        add_points_to_user(token, points)
        
        return {"message": "Question added"}
    except KeyError as ke:
        raise HTTPException(status_code=422, detail=f"Invalid data format: {str(ke)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")



#the route helps to get a new question || next question function is in next_question.py
@app.post("/question")
def get_question(request: QuestionRequest, token: str = Depends(oauth2_scheme)):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = decoded_token.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid token provided.",
            )
        if request.question_no < 0 or request.question_no >= len(test.objects.get(no=1).questions):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Invalid question number provided: {request.question_no}.",
            )
        
        if request.question_no == 0:
            return {"message": test.objects.get(no=1).questions[0]}

        check = next_question(request.old_level, request.question_no - 2, request.old_answer, request.language)
        return {"message": check}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing request: {str(e)}",
        )


#the function helps to get the Leaderboard with username having highest points and so on
@app.get("/leaderboard")
def get_leaderboard():
    try:
        Leaderboard = User.objects.only("username", "total_points").order_by("-total_points") #order_by is used to sort the data in descending order
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