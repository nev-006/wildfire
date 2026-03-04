from src.services.scraperService import get_nearest_fire_data
import sys

# Test LA Coordinates
LA_LAT = 34.0522
LA_LON = -118.2437

print(f"Fetching nearest fire data for Los Angeles ({LA_LAT}, {LA_LON})...")
fire_data = get_nearest_fire_data(LA_LAT, LA_LON)

if fire_data:
    print(f"Success! Nearest fire is {fire_data['distance_km']} km away.")
    print(fire_data)
else:
    print("No fire data found globally :(")
    sys.exit(1)
