from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

client = MongoClient(
    "mongodb+srv://admin:test123@bankapi.bcdjw.mongodb.net/?retryWrites=true&w=majority&appName=bankapi",
    server_api=ServerApi("1"),
)
db = client.bankapi
db = client["bank"]
user_collection = db["users"]
