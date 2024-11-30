from bson import ObjectId
from fastapi import HTTPException

from config.database import user_collection


def delete_user(user_id: str):
    object_id = ObjectId(user_id)
    user = user_collection.find_one({"_id": object_id})
    if not user:
        raise HTTPException(status_code=404, detail="User do not exisist")
    result = user_collection.delete_one({"_id": object_id})
    print(result)
    return {"message": "user deleted successfully"}
