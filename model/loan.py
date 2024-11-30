from pydantic import BaseModel


class Loan(BaseModel):
    user_name: str
    amount: float
