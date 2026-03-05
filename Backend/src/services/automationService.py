from ..database.db import user_collection
from .notificationService import send_alert_email
from ..api.wildfireApi import predict_fire
from ..schema.users import WildfireInput
from .scraperService import get_nearest_fire_data
from datetime import datetime
import asyncio

def run_wildfire_checks():
    print(f"Running scheduled wildfire checks at {datetime.now()}")
    
    # Find users who have alerts enabled and have a defined latitude/longitude
    users_to_check = list(user_collection.find({
        "alerts_enabled": True,
        "latitude": {"$ne": None},
        "longitude": {"$ne": None},
        "email": {"$ne": None}
    }))
    print(f"[DEBUG] Found {len(users_to_check)} eligible user(s) to check.")
    
    for user in users_to_check:
        try:
            # Fetch the closest FIRMS actual satellite data based on user profile
            lat = float(user["latitude"])
            lon = float(user["longitude"])
            fire_data = get_nearest_fire_data(lat, lon)
            if not fire_data:
                print(f"No fire data found globally for user {user.get('email', 'unknown')}. Skipping.")
                continue

            input_data = WildfireInput(
                latitude=fire_data["latitude"],
                longitude=fire_data["longitude"],
                brightness=fire_data["brightness"],
                scan=fire_data["scan"],
                acq_date=fire_data["acq_date"],
                acq_time=fire_data["acq_time"],
                bright_t31=fire_data["bright_t31"],
                daynight=fire_data["daynight"]
            )
            
            # Predict Risk
            result = predict_fire(input_data)
            
            # Check Risk based on the returned Fire Radiative Power (FRP)
            predicted_frp = result.get("predicted_frp", 0)
            print(f"[DEBUG] User {user.get('email')} → Predicted FRP: {predicted_frp}")
            
            # ⚠️ TEST: threshold lowered to 0 to force email. Change back to 50.0 for production.
            if predicted_frp > 0:
                risk_prob = min(predicted_frp, 99.9)
                send_alert_email(user["email"], user.get("location", "Unknown Location"), round(risk_prob, 2))
                    
        except Exception as e:
            print(f"Error processing user {user.get('email', 'unknown')}: {e}")
