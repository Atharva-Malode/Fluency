from fastapi import APIRouter, HTTPException, status
from models import User


Leaderboard = APIRouter()


#the function helps to get the Leaderboard with username having highest points and so on
@Leaderboard.get("/leaderboard")
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