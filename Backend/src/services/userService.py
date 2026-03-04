from ..database.db import user_collection
from ..core.hashing import Hash
from geopy.geocoders import Nominatim
import ssl
import certifi

# Setting up geolocator securely
ctx = ssl.create_default_context(cafile=certifi.where())
geolocator = Nominatim(user_agent="wildfire_app_predictor", ssl_context=ctx)

def register_user(user):

    user_data = user.dict()
    user_data['password'] = Hash.get_password_hash(user_data['password'])
    user_collection.insert_one(user_data)

    return {"message": "User registered successfully"}

def get_user_profile(username: str):
    user = user_collection.find_one({"username": username}, {"_id": 0, "password": 0})
    return user

async def update_user_profile(username: str, profile_data: dict):
    update_fields = {}
    if profile_data.get("location"):
        try:
            # Geocode user's location robustly
            location = geolocator.geocode(profile_data["location"], timeout=10)
            if location:
                update_fields["location"] = location.address
                update_fields["latitude"] = location.latitude 
                update_fields["longitude"] = location.longitude
            else:
                 update_fields["location"] = profile_data["location"]
        except Exception as e:
            print(f"Geocoding error: {e}")
            update_fields["location"] = profile_data["location"]
        
    if profile_data.get("alerts_enabled") is not None:
        update_fields["alerts_enabled"] = profile_data["alerts_enabled"]
        
    if update_fields:
        user_collection.update_one({"username": username}, {"$set": update_fields})
        
    return {"message": "Profile updated successfully"}

