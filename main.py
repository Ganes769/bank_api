from fastapi import FastAPI,HTTPException
from pydantic import BaseModel,Field,field_validator
app = FastAPI()
class BankUser(BaseModel):
    id:str
    user_name:str
    account_number:int
    initial_balance:float=Field(ge=10,le=200,description="Initial balance should between 10 to 200 ")
    @field_validator("account_number")
    @classmethod    
    def validate_accountnumber(cls,value):
        account_str=str(value)
        if not(len(account_str)==5 and account_str.isdigit()):
            raise HTTPException('Account number must be a 5-digit number')
        return value
user_db: dict[str, BankUser] = {}
user_db["1"] = BankUser(id="1", user_name="Alice", account_number=66666,initial_balance=99)
user_db["2"] = BankUser(id="2", user_name="jhon", account_number=88888,initial_balance=100)
@app.get("/")
def read_root():
    return "welcome to bank"

@app.post("/user")
def createuser():
    user_id=str(input("Enter a new user id"))
    user_name=str(input("Enter username"))
    account_number=int(input("Enter account number"))
    init_balance=float(input("Enter initial balance"))
    new_user=BankUser(
        id=user_id,
        user_name=user_name,
        initial_balance=init_balance,
        account_number=account_number
    )
    user_db[user_id]=new_user
    return {"message": "User created successfully", "user_id": user_id}
@app.get("/user/{user_id}")
def get_user(user_id: str
):
   
    user = user_db.get(user_id)
    if user:
       return {
            "id": user.id,
            "name": user.user_name,
            "account_number": user.account_number,
            "initial_balance": user.initial_balance
        }
        
@app.post("/transfer")
def transfer_balance():
    sender_acc_no=int(input("Enter your account number"))
    reciever_acc_no=int(input("Enter reciever account number"))
    amount=float(input("Enter the amount"))
    sender=next((user for user in user_db.values() if user.account_number == sender_acc_no),None)
    reciever=next((user for user in user_db.values() if user.account_number == reciever_acc_no),None)
    if not sender:
      raise HTTPException(status_code=404,detail="Sender account not found") 
    if not reciever:
      raise HTTPException(status_code=404,detail="Reciever account not found")
    if sender.initial_balance < amount:
        raise HTTPException(status_code=404,detail="Insufficent balance")
    sender.initial_balance-=amount
    reciever.initial_balance+=amount
    return {
        "messsage":"Transfer successfully",
        "sender_balance": sender.initial_balance,
        "receiver_balance": reciever.initial_balance,
    }
@app.patch("/loan")
def getloan():
    username=str(input("Enter your username to get loan"))
    amount=float(input("Enter how much  loan you want"))
    current_account=next((user for user in user_db.values() if user.user_name==username),None)
    if not current_account:
        raise HTTPException(detail="This username doesn`t exsist",status_code=404)
    current_account.initial_balance+=amount
    return {
        "message":"Loan succesfully granted",
        "username":username,
        "new_balance":current_account.initial_balance
    }
@app.delete("/user/{user_id}")
def deleteuser(user_id:str):
    if user_id not in user_db:
        raise HTTPException(status_code=404, detail="User not found")
    del user_db[user_id]
    return {"message": f"User with ID {user_id} deleted successfully"}
@app.get("/all_user")
def get_all_users():
    return {
        "users": list(user_db.values())
    }