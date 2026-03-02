from xml.parsers.expat import model
from fastapi import APIRouter
from ..database.db import get_db,user_collection
import joblib
import os
from dotenv import load_dotenv
from  ..schema import users, location
from ..services import scraperService, geocodingService
import numpy as np

model = joblib.load("src/model/gbr_model.pkl")

router = APIRouter()

@router.post("/autofill-data")
def autofill_data(loc: location.LocationInput):
    lat, lon = loc.latitude, loc.longitude
    
    if loc.location_name:
        coords = geocodingService.get_coordinates(loc.location_name)
        print(coords)
        if coords:
            lat, lon = coords
        else:
            return {"error": "Could not find coordinates for the given location name."}

    if lat is None or lon is None:
        return {"error": "Latitude and Longitude are required if Location Name is not provided."}

    data = scraperService.get_nearest_fire_data(lat, lon)
    if data:
        return data
    return {"error": "No fire data found"}

@router.get("/")
def index():
    return {"message": "Welcome to the Wildfire API"}       


@router.get("/feature-names")
def get_feature_names():
    pass


@router.post("/predict-fire")
def predict_fire(data: users.WildfireInput):

    month = int(data.acq_date.split("-")[1])
    
    acq_time_clean = data.acq_time.replace(":", "")
    acq_time_int = int(acq_time_clean)


    daynight_encoded = 0 if data.daynight == "D" else 1

    input_array = np.array([[ 
        data.latitude,
        data.longitude,
        month,
        data.brightness,
        data.scan,
        acq_time_int,
        data.bright_t31,
        daynight_encoded
    ]])

    prediction = model.predict(input_array)

    return {
        "predicted_frp": float(prediction[0])
    }


