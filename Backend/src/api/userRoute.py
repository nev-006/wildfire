from fastapi import APIRouter,Depends
from ..schema.users import User
from ..database.db import get_db
from ..services import userService

router = APIRouter(
    prefix="/user",
    tags=["user"]
)

@router.post("/register")
def register_user(user: User, db=Depends(get_db)):
    
    return userService.register_user(user)
