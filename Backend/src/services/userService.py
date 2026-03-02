from ..database.db import user_collection
from ..core.hashing import Hash

def register_user(user):

    user_data = user.dict()
    user_data['password'] = Hash.get_password_hash(user_data['password'])
    user_collection.insert_one(user_data)

    return {"message": "User registered successfully"}

