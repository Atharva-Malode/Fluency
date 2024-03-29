from fastapi import FastAPI
from mongoengine import connect
from fastapi.middleware.cors import CORSMiddleware
from fastapi import APIRouter
from routes.cam.cam import camrouter
from routes.auth.signup import signup
from routes.auth.login import Login
from routes.leaderboard.board import Leaderboard
from routes.questions.save_question import Addquestionrouter
from routes.user_data.get_user_details import UserData
from routes.questions.get_question import NextQuestion
from routes.home.home import Home
from routes.warning.add_warning import warning
from routes.startExam.exam import exam

app = FastAPI()  #creating the app


#make sure to change the database name and the port number
connect("fluency", host="localhost", port=27017) #connecting to the database



#to allow the frontend to access the backend CORS is used
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


app.include_router(signup, tags=["Auth"])

app.include_router(Login, tags=["Auth"])

app.include_router(Leaderboard, tags=["leaderboard"])

app.include_router(Addquestionrouter, tags=["question"])

app.include_router(UserData, tags=["User Data"])

app.include_router(NextQuestion,tags=["question"])

app.include_router(Home, tags=["home"])

app.include_router(warning, tags=["warning"])

app.include_router(exam, tags=["exam"])