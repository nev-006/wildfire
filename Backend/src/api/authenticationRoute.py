from fastapi import HTTPException, status,APIRouter,Depends
from ..services import authenticationService
from ..database.db import get_db
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter(
    prefix="/authentication",
    tags=["authentication"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

@router.get("/authenticate-token")
def authenticate_token(token:str = Depends(oauth2_scheme),db = Depends(get_db)):
    return authenticationService.verify_token(token,db,credentials_exception)


@router.post("/login")
def login(data: OAuth2PasswordRequestForm = Depends(),db = Depends(get_db)):
    return authenticationService.login_user(data,db)

def get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db)):
    token_data = authenticationService.verify_token(token, db, credentials_exception)
    user = db["users"].find_one({"username": token_data.username})
    if user is None:
        raise credentials_exception
    return user