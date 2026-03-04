from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from ..schema.users import User, UserProfileUpdate
from ..database.db import get_db
from ..services import userService
from .authenticationRoute import get_current_user
from ..services.automationService import run_wildfire_checks

router = APIRouter(
    prefix="/user",
    tags=["user"]
)

@router.post("/register")
def register_user(user: User, db=Depends(get_db)):
    return userService.register_user(user)

@router.get("/profile")
def get_profile(current_user: User = Depends(get_current_user)):
    profile = userService.get_user_profile(current_user["username"])
    if not profile:
        raise HTTPException(status_code=404, detail="User not found")
    return profile

@router.put("/profile")
async def update_profile(profile_data: UserProfileUpdate, current_user: User = Depends(get_current_user)):
    response = await userService.update_user_profile(current_user["username"], profile_data.dict(exclude_unset=True))
    return response
