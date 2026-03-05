from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["wildfire_database"]
user_collection = db["users"]
prediction_history = db["prediction_history"]


def get_db():
    return db


