from typing import Optional

from fastapi import FastAPI, Query

from model.bankuser import BankUser
from model.loan import Loan
from model.transfer_balance import Transferequest
from queries.createuser import create_user
from queries.delete_user import delete_user
from queries.get_loan import get_loan
from queries.getuser import get_all_users
from queries.transfer_balance import transfer_balance

# from services import create_user, delete_user, get_all_users, get_loan, transfer_balance

app = FastAPI(swagger_ui_parameters={"syntaxHighlight": False})


@app.get("/")
def read_root():
    return "Welcome to the bank"


@app.post("/user")
def create_user_route(user: BankUser):
    return create_user(user)


@app.post("/transfer")
def transfer_route(user: Transferequest):
    return transfer_balance(user)


@app.patch("/loan")
def gate_loan_route(user: Loan):
    return get_loan(user)


@app.delete("/user/{user_id}")
def delete_user_route(
    user_id: str,
):
    return delete_user(user_id)


@app.get("/all_user")
def getall_user_route(
    user_id: Optional[str] = Query(None, description="Filter by user ID")
):
    print(f"Received user_id: {user_id}")
    result = get_all_users(user_id=user_id)
    return result
