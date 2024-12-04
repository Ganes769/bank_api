import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [username, setusername] = useState<string>("");
  const [accountNumber, setAccountnNumber] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      id: "",
      username: "",
      accountNumber: undefined,
      balance: undefined,
    },
  });
  const { errors } = formState;
  async function SignUp() {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/user",

        {
          id: id,
          user_name: username,
          account_number: accountNumber,
          initial_balance: balance,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        toast.success("user created successfully");
        navigate("/");
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Mini Bank
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create a new account
            </h1>
            <form
              onSubmit={handleSubmit(SignUp)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your id
                </label>
                <input
                  {...register("id", { required: true })}
                  name="id"
                  value={id}
                  type="text"
                  onChange={(e) => setId(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors.id && (
                  <p className="text-red-800">Id number is required</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  username
                </label>
                <input
                  {...register("username", { required: true })}
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.username && (
                  <p className="text-red-800">username is required</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Account number
                </label>
                <input
                  {...register("accountNumber", {
                    required: true,
                    maxLength: {
                      value: 5,
                      message: "Account number must be exactly 5 digits",
                    },
                  })}
                  value={accountNumber}
                  onChange={(e) => setAccountnNumber(e.target.value)}
                  type="text"
                  name="accountNumber"
                  id="username"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.accountNumber && (
                  <p className="text-red-800">Account number is required</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  initial balance
                </label>
                <input
                  {...register("balance", {
                    required: true,
                    max: {
                      value: 100,
                      message: "Initial balance should be less than 100",
                    },
                  })}
                  value={balance}
                  type="text"
                  onChange={(e) => setBalance(e.target.value)}
                  name="balance"
                  id="username"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.balance && (
                  <p className="text-red-800">Initial balance is required</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#4E976A] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account yet?{" "}
                <Link
                  to={"/"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
