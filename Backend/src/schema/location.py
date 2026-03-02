from pydantic import BaseModel

class LocationInput(BaseModel):
    latitude: float | None = None
    longitude: float | None = None
    location_name: str | None = None
