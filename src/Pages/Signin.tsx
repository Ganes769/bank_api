import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { name: "", acc: "" },
  });
  const { errors } = formState;
  const [usrename, setUsername] = useState("");
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState<string>(" ");

  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/all_user",
        {
          username: usrename,
          account_number: accountNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const users = response.data.users;
      console.log(response);
      const user =
        users &&
        users.find(
          (user: { user_name: string; account_number: number }) =>
            user.user_name === usrename &&
            user.account_number === Number(accountNumber)
        );
      if (user) {
        toast.success("user created successfully");
        navigate("/dashboard", { state: { user } });
      }
      if (!user) {
        toast.error("user don`t exsist");
      }
    } catch (err: any) {
      console.log(err);
      toast.error("Failed to authenticate. Please try again.");
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
          MiniBank
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 /">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your username
                </label>
                <input
                  {...register("name", { required: true })}
                  value={usrename}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors.name && (
                  <p className="text-red-800">name is required</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Account Number
                </label>
                <input
                  {...register("acc", { required: true })}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  type="text"
                  name="acc"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.acc && (
                  <p className="text-red-800">Account number is incorrect </p>
                )}
              </div>
              <div className="flex items-center justify-between"></div>

              <button
                type="submit"
                className="w-full text-white bg-[#4E976A] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to={"/signup"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
