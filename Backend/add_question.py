from fastapi import HTTPException
from accese_token import SECRET_KEY, ALGORITHM
from models import User, Question
import jwt

def add_question_to_user(
    token: str,
    question: str,
    answer: str,
    time_taken: str,
    points: int
):
    decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username = decoded_token.get("sub")

    try:
        user = User.objects.get(username=username)
        new_question = Question(
            question=question,
            answer=answer,
            time_taken=time_taken,
            points=points
        )
        user.questions.append(new_question)
        user.save()
        return {"message": "Question added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding question: {str(e)}")