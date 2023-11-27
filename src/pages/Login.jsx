import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postData } from "../services/api/axios";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setErrorMessage("");
    console.log(data)
    try {
      const userData = await postData("/login", data, false);
      localStorage.setItem("accessToken", userData.accessToken);
      localStorage.setItem("user",JSON.stringify(userData.user));
      setIsLoading(false);
      reset();
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error signing in user:", error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#F9F9F9] h-screen">
      <div className="h-screen mx-auto container flex items-center justify-center">
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <div className="flex justify-center mt-2">
            <a href="/" className="text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="30"
                viewBox="0 0 29 30"
                fill="none"
              >
                <circle
                  cx="12.0143"
                  cy="12.5143"
                  r="12.0143"
                  fill="#3575E2"
                  fillOpacity="0.4"
                />
                <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
              </svg>
              {/* <span>JobPortal</span> */}
            </a>
          </div>

          <p className="text-2xl text-center font-semibold mb-7">
            Welcome back!
          </p>
          <div className="mt-5 pb-5">
            <form className="space-y-5">
              <p className="text-red-500 text-sm">{errorMessage !== "" && errorMessage}</p>
              <div>
                <label className="block mb-2 text-xs">Email</label>
                <input
                  placeholder="Ex: philjames@gmail.com"
                  {...register("email")}
                  className="border rounded-md focus:outline-blue border-solid border-gray-500 block w-full outline-gray-500 outline-1 flex-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400  sm:text-xs"
                />
              </div>
              <div>
                <label className="block mb-2 text-xs">Password</label>
                <input
                  placeholder="Ex: password123"
                  {...register("password")}
                  className="border rounded-md focus:outline-blue border-solid border-gray-500 block w-full outline-gray-500 outline-1 flex-1 bg-white py-2 pl-3 text-gray-900 placeholder:text-gray-400  sm:text-xs"
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Login
              </button>
            </form>
             <p className="text-sm mt-4"><span className="text-semibold ">Don't have an account?</span> <Link to="/register" className="text-blue">Sign up</Link> </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
