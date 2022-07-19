import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginData } from "./../utils/demo/ApiCall";

import { LoginContext } from "./../context/LoginContext";

import ImageLight from "../assets/img/login-office.jpeg";
import ImageDark from "../assets/img/login-office-dark.jpeg";
import { Label, Input, Button } from "@windmill/react-ui";

function Login() {
  const { logIn } = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Couldn't send Request");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const loginVerify = (e) => {
    e.preventDefault();
    setError(false);
    if (email === "" || password === "") {
      setError(true);
      setErrorMessage("Please fill up the required fields");
      return;
    }
    login();
  };

  const login = () => {
    loginData(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        logIn();
        history.push(`/app`);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              {/* {isInValid && (
                <h1 className="text-red-500 mb-4">
                  Incorrect email or Password
                </h1>
              )}

              {isEmpty && (
                <h1 className="text-red-500 mb-[30px]">
                  Please Fill the required fields
                </h1>
              )}
              {isServerError && (
                <h1 className="text-red-500 mb-[30px]">
                  Internal Server Error
                </h1>
              )} */}
              {isError && (
                <h1 className="text-red-500 mb-[30px]">{errorMessage}</h1>
              )}
              <Label>
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="email"
                  placeholder="john@doe.com"
                  value={email}
                  onChange={handleEmail}
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                  value={password}
                  onChange={handlePassword}
                />
              </Label>

              <Button className="mt-4" block onClick={loginVerify}>
                Log in
              </Button>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
