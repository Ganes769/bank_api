from pydantic import BaseModel


class Transferequest(BaseModel):
    rec_acc_no: int
    sender_acc_no: int
    amount: float
