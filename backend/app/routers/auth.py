from fastapi import APIRouter
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

# Dummy user for demonstration
fake_user_db = {
    "testuser": {
        "username": "testuser",
        "password": "testpass"
    }
}

@router.post("/signin", tags=["login"])
def signin(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_user_db.get(form_data.username)
    if not user or user["password"] != form_data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Sign in successful", "username": user["username"]}


@router.post("/signup", tags=["register"])
