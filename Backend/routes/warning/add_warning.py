from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from models import User
import jwt
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

warning = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@warning.get("/warnings")
async def get_warnings(token: str = Depends(oauth2_scheme)):
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = decoded_token.get("sub")
        user = User.objects.get(username=username)
        return {"warnings": user.warnings}
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    except User.DoesNotExist:
        raise HTTPException(status_code=404, detail="User not found")

# from fastapi import APIRouter, WebSocket, Depends, HTTPException
# from fastapi.security import OAuth2PasswordBearer
# from models import User
# import jwt
# from dotenv import load_dotenv
# import os

# load_dotenv()

# SECRET_KEY = os.getenv("SECRET_KEY")
# ALGORITHM = os.getenv("ALGORITHM")

# warning = APIRouter()

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# # Maintain a dictionary to store the previous warning count for each user
# previous_warning_counts = {}

# # Maintain a set of active WebSocket connections
# active_websockets = set()

# @warning.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket, token: str = Depends(oauth2_scheme)):
#     await websocket.accept()
#     active_websockets.add(websocket)
#     try:
#         decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username = decoded_token.get("sub")
#         user = User.objects.get(username=username)
#         while True:
#             # Get the current warning count from the database
#             current_warning_count = user.warnings
#             # Get the previous warning count from the dictionary
#             previous_warning_count = previous_warning_counts.get(username, 0)
#             # Check if the current count is greater than the previous count
#             if current_warning_count > previous_warning_count:
#                 # Send warning message to the frontend
#                 await websocket.send_text("Warning : You have been caught cheating!")
#                 # Update the previous count in the dictionary
#                 previous_warning_counts[username] = current_warning_count
#     except jwt.PyJWTError:
#         raise HTTPException(status_code=401, detail="Could not validate credentials")
#     except User.DoesNotExist:
#         raise HTTPException(status_code=404, detail="User not found")
#     finally:
#         active_websockets.remove(websocket)
