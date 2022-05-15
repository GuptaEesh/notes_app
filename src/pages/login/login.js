import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  InputPass,
  InputSimple,
  SmallLoader,
} from "../../components";
import { useAuth } from "../../helpers/context";
import { loginHandler, requests } from "../../helpers/utils";
export function LoginScreen() {
  const initial = {
    error: false,
    loader: false,
  };
  const { login } = useAuth();
  const [formFields, setFormFields] = useState(initial);
  const { email, password, error, loader } = formFields;

  const guestLogin = (e) => {
    e.preventDefault();
    setFormFields({
      ...formFields,
      email: "eesh@eesh.com",
      password: "1Gu!qwer",
    });
  };
  const inputHandler = (e) =>
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  const submitHandler = (e) =>
    loginHandler(e, setFormFields, login, formFields);
  return (
    <div className="flex bg-bgColor h-screen w-screen items-center justify-center">
      {loader ? (
        <div className="flex flex-col items-center">
          <SmallLoader />
          <h2 className="text-heading">Logging you in</h2>
        </div>
      ) : (
        <form
          onSubmit={submitHandler}
          className="flex bg-glass backdrop-blur-md shadow-[0_0_16px_0_var(--color-heading)] flex-col rounded p-4 gap-4 w-80"
        >
          <InputSimple
            title="Email"
            inputType="email"
            inputName="email"
            inputClass="p-1 w-full"
            inputValue={email ?? ""}
            inputFunc={inputHandler}
            inputPlaceHolder="email..."
          />
          <InputPass
            title="Password"
            inputType="password"
            inputName="password"
            inputClass="p-1 w-full "
            inputValue={password ?? ""}
            inputFunc={inputHandler}
            inputPlaceHolder="password..."
          />
          {error ? (
            <span className="flex font-medium items-center justify-center text-lg bg-light_background text-error">
              Wrong Credentials
            </span>
          ) : (
            <span className="opacity-0">Validate</span>
          )}
          <Button
            btnType="font-bold rounded p-1 bg-primary text-secondary"
            btnText="Fill-in test credentials"
            btnFunc={guestLogin}
          />
          <span className="flex flex-col text-heading">
            New Here?
            <Link to={requests.signup}>
              <span className="rounded py-0.5 px-1 pointer bg-secondary font-bold">
                Register Here &gt;{" "}
              </span>
            </Link>
          </span>
          <Input
            inputType="submit"
            inputClass="rounded p-1 bg-primary text-secondary font-bold"
            inputValue="Login"
          />
        </form>
      )}
    </div>
  );
}
