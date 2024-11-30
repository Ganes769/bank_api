from fastapi import HTTPException
from pydantic import BaseModel, Field, field_validator


class BankUser(BaseModel):
    id: str
    user_name: str
    account_number: int
    initial_balance: float = Field(
        ge=10, le=200, description="Initial balance should be between 10 and 200"
    )

    @field_validator("account_number")
    @classmethod
    def validate_accountnumber(cls, value):
        account_str = str(value)
        if len(account_str) != 5 or not account_str.isdigit():
            raise HTTPException(
                status_code=400, detail="Account number must be a 5-digit number"
            )
        return value
