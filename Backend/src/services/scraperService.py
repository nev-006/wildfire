import pandas as pd
import requests
import io
import math

# NASA FIRMS Data Source (Global 24h)
DATA_URL = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis-c6.1/csv/MODIS_C6_1_Global_24h.csv"

def get_haversine_distance(lat1, lon1, lat2, lon2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    R = 6371  # Radius of earth in km
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = math.sin(dLat/2) * math.sin(dLat/2) + \
        math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * \
        math.sin(dLon/2) * math.sin(dLon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = R * c # Distance in km
    return d

def fetch_live_fire_data():
    """
    Fetches the latest active fire data from NASA FIRMS.
    Returns a pandas DataFrame.
    """
    try:
        response = requests.get(DATA_URL)
        response.raise_for_status()
        content = response.content.decode('utf-8')
        df = pd.read_csv(io.StringIO(content))
        return df
    except Exception as e:
        print(f"Error fetching fire data: {e}")
        return None

def get_nearest_fire_data(lat, lon):
    """
    Finds the nearest active fire data point to the given latitude and longitude.
    Returns a dictionary of fire parameters.
    """
    df = fetch_live_fire_data()
    
    if df is None or df.empty:
        return None

    # Calculate distance for each point
    # Note: For large datasets, this can be optimized with spatial indexing (e.g., KDTree)
    # But for 24h regional data, this is fast enough.
    
    # We can use a simple Euclidean distance approximation for sorting, 
    # then calculate real distance for the top match if needed, 
    # but Haversine is better for accuracy.
    
    min_dist = float('inf')
    nearest_row = None

    for index, row in df.iterrows():
        dist = get_haversine_distance(lat, lon, row['latitude'], row['longitude'])
        if dist < min_dist:
            min_dist = dist
            nearest_row = row

    if nearest_row is not None:
        # Format the data for our frontend
        # Ensure acq_time is formatted as HHMM string usually, 
        # CSV gives int (e.g. 535), we might need to pad it to '0535'
        acq_time_str = str(int(nearest_row['acq_time'])).zfill(4)
        acq_time_formatted = f"{acq_time_str[:2]}:{acq_time_str[2:]}"

        return {
            "latitude": float(nearest_row['latitude']),
            "longitude": float(nearest_row['longitude']),
            "brightness": float(nearest_row['brightness']),
            "scan": float(nearest_row['scan']),
            "track": float(nearest_row['track']),
            "acq_date": str(nearest_row['acq_date']),
            "acq_time": acq_time_formatted,
            "satellite": str(nearest_row['satellite']),
            "confidence": float(nearest_row['confidence']),
            "version": str(nearest_row['version']),
            "bright_t31": float(nearest_row['bright_t31']),
            "frp": float(nearest_row['frp']),
            "daynight": str(nearest_row['daynight']),
            "distance_km": round(min_dist, 2)
        }
    
    return None
