from typing import Optional

from bson import ObjectId
from fastapi import HTTPException

from config.database import user_collection


def get_all_users(user_id: Optional[str] = None):
    if user_id:
        try:
            object_id = ObjectId(user_id)
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid user ID format")
        user = user_collection.find_one({"_id": object_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user["_id"] = str(user["_id"])
        return {"user": user}
    users = list(user_collection.find())
    for user in users:
        user["_id"] = str(user["_id"])
    return {"users": users}
