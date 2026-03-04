from fastapi import FastAPI
from contextlib import asynccontextmanager
from apscheduler.schedulers.background import BackgroundScheduler
from .api import wildfireApi, userRoute, authenticationRoute
from fastapi.middleware.cors import CORSMiddleware
from .services.automationService import run_wildfire_checks

scheduler = BackgroundScheduler()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start the scheduler
    # We run it every 12 hours (twice a day)
    scheduler.add_job(run_wildfire_checks, 'interval', hours=12)
    scheduler.start()
    yield
    # Shutdown the scheduler
    scheduler.shutdown()

app = FastAPI(lifespan=lifespan)

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