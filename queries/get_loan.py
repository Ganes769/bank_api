from fastapi import HTTPException

from config.database import user_collection
from model.loan import Loan


def get_loan(loan: Loan):

    current_account = user_collection.find_one({"user_name": loan.user_name})
    if not current_account:
        raise HTTPException(status_code=404, detail="Account does not exist")

    current_balance = current_account.get("initial_balance", 0)
    newbalance = current_balance + loan.amount
    result = user_collection.update_one(
        {"user_name": loan.user_name}, {"$set": {"initial_balance": newbalance}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to update account balance")
    return {
        "message": "Loan granted successfully",
        "user_name": loan.user_name,
        "new_balance": newbalance,
    }
