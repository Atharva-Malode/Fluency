from fastapi import APIRouter, HTTPException,status
from models import User, NewUser
from mongoengine.errors import NotUniqueError
from routes.auth.authenticate.pass_hash import get_password_hash

signup = APIRouter()


@signup.post("/signup")
def sign_up(new_user: NewUser):
    try:
        if User.objects.filter(username=new_user.username).count() > 0:
            return {"message": "User already exists"}
        user = User(username=new_user.username, password=get_password_hash(new_user.password), total_points=0, warnings=0)
        user.save()
        return {"message": "Signup successful"}
    except NotUniqueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing the signup request"
        )