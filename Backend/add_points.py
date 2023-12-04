from accese_token import SECRET_KEY, ALGORITHM
from models import User
from fastapi import HTTPException
import jwt

def add_points_to_user(token: str, points_to_add: int):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = decoded_token.get("sub")
        
        user = User.objects.get(username=username)
        user.total_points = user.total_points + points_to_add
        user.save()
        return {"message": f"{points_to_add} points added to {username}'s total points."}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except User.DoesNotExist:
        raise HTTPException(status_code=404, detail=f"User {username} not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding points: {str(e)}")