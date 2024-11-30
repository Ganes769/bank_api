from fastapi import HTTPException

from config.database import user_collection
from model.bankuser import BankUser


def create_user(user: BankUser):
    user_dict = user.dict()
    user_dict.pop("id", None)
    if user_collection.find_one({"_id": user.id}):
        raise HTTPException(status_code=400, detail="User ID already exists")
    if user_collection.find_one({"account_number": user.account_number}):
        raise HTTPException(status_code=400, detail="Account number already exists")
    result = user_collection.insert_one(user_dict)
    user_dict["_id"] = str(result.inserted_id)
    return {
        "message": "User created successfully",
    }
