import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function DashBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location?.state?.user); // Make user stateful
  const {
    reset,
    handleSubmit: handleLoanSubmit,
    formState: loanFormState,
    register: loanRegister,
  } = useForm({
    defaultValues: {
      amount: undefined,
    },
  });
  const {
    handleSubmit: handleTransferSubmit,
    formState: transferFormState,

    register: transferRegister,
  } = useForm({
    defaultValues: {
      receiverAccount: undefined,
      transferAmount: undefined,
    },
  });
  const { errors: loanErrors } = loanFormState;
  const { errors: transferErrors } = transferFormState;

  // Function to request a loan
  const requestLoan = async (data: { amount?: number }) => {
    try {
      const response = await axios.patch(
        "http://127.0.0.1:8001/loan",
        {
          user_name: user.user_name,
          amount: data.amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Loan granted succefully");

        // Update user's balance
        setUser((prevUser: { initial_balance: number }) => ({
          ...prevUser,
          initial_balance: prevUser.initial_balance + Number(data.amount),
        }));
        reset();
      }
    } catch (error) {
      console.error("Error requesting loan:", error);
    }
    console.log(user._id);
  };
  async function delteAccount(userid: string) {
    confirm("Do you want to delete your accout?");
    await axios.delete(`http://127.0.0.1:8001/user/${userid}`);
    toast.success("user deleted successfully");
    navigate("/");
  }
  // Function to transfer balance
  const transferBalance = async (data: {
    receiverAccount: number | undefined;
    transferAmount: number | undefined;
  }) => {
    if (data.transferAmount && data.transferAmount > user.initial_balance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/transfer",
        {
          sender_acc_no: user.account_number,
          rec_acc_no: data.receiverAccount,
          amount: data.transferAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Transfer successful!");

        // Update user's balance
        setUser((prevUser: any) => ({
          ...prevUser,
          initial_balance:
            prevUser.initial_balance - Number(data.transferAmount),
        }));
      }
      reset();
    } catch (error) {
      console.error("Error transferring balance:", error);
      toast.error("Transfer failed. Please try again.");
    }
  };
  if (!user) {
    return <p>no const [state, dispatch] = useReducer(first, second, third)</p>;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-center   h-screen justify-center px-6 mx-auto md:w-3/4">
        {/* Loan Request Form */}
        <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
          <div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Welcome, {user.user_name}
            </h1>
            <p className="text-lg text-gray-700 dark:text-white - ">
              Your balance:
              <span className="bg-red-500">{user.initial_balance} $</span>
            </p>
          </div>
          <h2 className="text-lg  flex justify-end font-medium text-gray-800 dark:text-gray-100">
            Request Loan
          </h2>
          <form onSubmit={handleLoanSubmit(requestLoan)} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Loan Amount
              </label>
              <input
                {...loanRegister("amount", {
                  required: "Loan amount is required",
                  validate: (value) =>
                    (value && value > 0) || "Amount must be greater than zero",
                })}
                type="number"
                placeholder="Enter loan amount"
                className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
              />
              {loanErrors.amount && (
                <p className="text-red-600 text-sm">
                  {loanErrors.amount.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-4 text-white bg-[#4E976A] rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600"
            >
              Request Loan
            </button>
          </form>
        </div>

        {/* Transfer Balance Form */}
        <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
            Transfer Balance
          </h2>
          <form
            onSubmit={handleTransferSubmit(transferBalance)}
            className="space-y-4"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Receiver Account Number
              </label>
              <input
                {...transferRegister("receiverAccount", {
                  required: "Receiver account number is required",
                })}
                type="text"
                placeholder="Enter receiver's account number"
                className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
              />
              {transferErrors.receiverAccount && (
                <p className="text-red-600 text-sm">
                  {transferErrors.receiverAccount.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Transfer Amount
              </label>
              <input
                {...transferRegister("transferAmount", {
                  required: "Transfer amount is required",
                  min: { value: 1, message: "Amount must be greater than 0" },
                })}
                type="number"
                placeholder="Enter amount to transfer"
                className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
              />
              {transferErrors.transferAmount && (
                <p className="text-red-600 text-sm">
                  {transferErrors.transferAmount.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-4 text-white bg-[#4E976A] rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600"
            >
              Transfer Balance
            </button>
            <button
              onClick={() => delteAccount(user._id)}
              type="button"
              className="w-full mt-4 text-white bg-red-700 rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600"
            >
              Delete account
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
