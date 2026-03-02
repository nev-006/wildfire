from pydantic import BaseModel

class User(BaseModel):

    name: str
    email: str
    password: str
    username:str

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class WildfireInput(BaseModel):
    latitude: float
    longitude: float
    brightness: float
    scan: float
    acq_date: str    
    acq_time: str     
    bright_t31: float
    daynight: str     

