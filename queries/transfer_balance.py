from fastapi import HTTPException

from config.database import user_collection
from model.transfer_balance import Transferequest


def transfer_balance(transferrequest: Transferequest):
    rec_acc_no = user_collection.find_one(
        {"account_number": transferrequest.rec_acc_no}
    )
    sender_acc_no = user_collection.find_one(
        {"account_number": transferrequest.sender_acc_no}
    )
    sender_current_balance = sender_acc_no.get("initial_balance", 0)
    rec_current_balance = rec_acc_no.get("initial_balance", 0)

    if sender_current_balance < transferrequest.amount:
        raise HTTPException(
            status_code=400, detail="Insufficient balance in sender's account"
        )

    rec_current_balance += transferrequest.amount
    sender_current_balance -= transferrequest.amount
    sender_update = user_collection.update_one(
        {"account_number": transferrequest.sender_acc_no},
        {"$set": {"initial_balance": sender_current_balance}},
    )

    receiver_update = user_collection.update_one(
        {"account_number": transferrequest.rec_acc_no},
        {"$set": {"initial_balance": rec_current_balance}},
    )
    if sender_update.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to update sender's balance")

    if receiver_update.modified_count == 0:
        raise HTTPException(
            status_code=500, detail="Failed to update receiver's balance"
        )
    return {
        "message": "Transfer successful",
        "sender_new_balance": sender_current_balance,
        "receiver_new_balance": rec_current_balance,
    }
