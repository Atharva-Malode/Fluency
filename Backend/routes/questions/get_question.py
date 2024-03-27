from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from models import questions
import random

NextQuestion = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@NextQuestion.get("/question")
def get_question():
    # try:
        # Get the total number of questions in the database
        total_questions = questions.objects.count()
        
        # Ensure there is at least one question in the database
        if total_questions == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No questions found in the database.",
            )
        
        # Get a random question from the database
        random_question = questions.objects.skip(random.randint(0, total_questions - 1)).first()
        
        # Return the random question
        return {
            "question": random_question.question,
            "options": random_question.options,
            "answer": random_question.answer,
            "explanation": random_question.explanation
        }
    # except Exception as e:
    #     raise HTTPException(
    #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    #         detail=f"Error processing request: {str(e)}",
    #     )


