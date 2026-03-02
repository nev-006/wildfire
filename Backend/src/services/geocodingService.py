from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut

def get_coordinates(location_name):
    """
    Returns (latitude, longitude) for a given location name.
    """
    geolocator = Nominatim(user_agent="wildfire_prediction_app")
    try:
        location = geolocator.geocode(location_name)
        print(f"Geocoding '{location_name}' resulted in: {location}")
        if location:
            return location.latitude, location.longitude
        return None
    except GeocoderTimedOut:
        return None
    except Exception as e:
        print(f"Geocoding error: {e}")
        return None
