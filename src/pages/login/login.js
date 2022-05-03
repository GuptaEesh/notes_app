import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, InputPass, InputSimple, Loader } from "../../components";
import { useAuth } from "../../helpers/context";
import { loginHandler } from "../../helpers/utils";
export function LoginScreen() {
  const initial = {
    email: "",
    password: "",
    error: false,
    loader: false,
  };
  const { login, isAuthenticated } = useAuth();
  const [formFields, setFormFields] = useState(initial);
  const navigate = useNavigate();
  useEffect(() => {
    isAuthenticated ? navigate("/") : navigate("/signin");
  }, [isAuthenticated]);
  const { email, password, error, loader } = formFields;

  const guestLogin = () =>
    setFormFields({
      ...formFields,
      email: "Aasda@sddfd.com",
      password: "asasd",
    });

  const submitHandler = (e) =>
    loginHandler(e, setFormFields, login, formFields);
  return (
    <div className="flex bg-light_background h-screen w-screen items-center justify-center">
      {loader ? (
        <div className="flex flex-col items-center">
          <Loader />
          <h2>Logging you in</h2>
        </div>
      ) : (
        <form
          onSubmit={submitHandler}
          className="flex bg-glass backdrop-blur-md shadow-[0_8px_32px_0_rgba(51, 84, 155, 0.527)] flex-col rounded p-4 gap-4 w-80"
        >
          <InputSimple
            title="Email"
            inputType="email"
            inputClass="p-1 w-full"
            inputValue={email}
            inputFunc={(e) =>
              setFormFields({
                ...formFields,
                email: e.target.value,
              })
            }
            inputPlaceHolder="email..."
          />
          <InputPass
            title="Password"
            inputType="password"
            inputClass="p-1 w-full "
            inputValue={password}
            inputFunc={(e) =>
              setFormFields({
                ...formFields,
                password: e.target.value,
              })
            }
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
            btnText="Guest Login"
            btnFunc={guestLogin}
          />
          <h2 className="flex flex-col">
            New Here?
            <Link className="pointer bg-secondary font-bold" to="/signup">
              <span>Register Here &gt; </span>
            </Link>
          </h2>
          <Button
            btnType="rounded p-1 bg-primary text-secondary font-bold"
            btnText="Login"
          />
        </form>
      )}
    </div>
  );
}
