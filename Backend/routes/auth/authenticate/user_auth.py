import json
from models import User
from routes.auth.authenticate.pass_hash import pwd_context

def authenticate_user(username, password):
    try:
        user = json.loads(User.objects.get(username=username).to_json())
        return pwd_context.verify(password,user["password"])
        # return password.check
    except User.DoesNotExist:
        return False