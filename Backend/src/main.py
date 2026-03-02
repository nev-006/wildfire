from fastapi import FastAPI

from .api import wildfireApi, userRoute,authenticationRoute
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5175",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(wildfireApi.router)
app.include_router(userRoute.router)
app.include_router(authenticationRoute.router)