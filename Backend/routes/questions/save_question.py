from fastapi import APIRouter
from models import AddQuestionRequest
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException
from routes.questions.save_to_mongo.add_question import add_question_to_user
from routes.questions.save_to_mongo.add_points import add_points_to_user


Addquestionrouter = APIRouter()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

#to add the data which user has entered : once submite button is clicked
@Addquestionrouter.post("/add_question")
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
        correct_answer = request_data.correct_answer

        # the function are implemented in add_question.py and add_points.py
        add_question_to_user(token, question, answer, time_seconds, points,correct_answer)
        add_points_to_user(token, points)
        
        return {"message": "Question added"}
    except KeyError as ke:
        raise HTTPException(status_code=422, detail=f"Invalid data format: {str(ke)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")