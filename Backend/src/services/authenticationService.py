import jwt
import os
from dotenv import load_dotenv
from ..schema.users import TokenData,Token
from ..core.hashing import Hash
from fastapi import HTTPException
from ..core.jwtToken import create_access_token

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def verify_token(token,db,credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.PyJWTError:
        raise credentials_exception
    username = payload.get("sub") 
    if username is None:
        raise credentials_exception
    token_data = TokenData(username=username)
    return token_data

def login_user(data,db):
    print("Login attempt for user:", data.username)
    user = db["users"].find_one({
      "username": data.username
    })
    print(user)
    print(data.password)    
    if not user or not Hash.verify_password(data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    token_data = {"sub": user["username"]}
    access_token = create_access_token(data=token_data)
    return {"access_token": access_token, "token_type": "bearer","message":"Login successful"}   
