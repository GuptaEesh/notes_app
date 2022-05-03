import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input, InputPass, InputSimple, Loader } from "../../components";
import { useAuth } from "../../helpers/context";
import { signUpHandler } from "../../helpers/utils";
import { PassChecker } from "./password-checker";

export function SignUpScreen() {
  const initial = {
    error: false,
    message: "",
    loader: false,
  };
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formFields, setFormFields] = useState(initial);
  const { name, email, password, confirmPass, error, message, loader } =
    formFields;
  console.log(formFields);
  useEffect(() => {
    isAuthenticated ? navigate("/") : navigate("/signup");
  }, [isAuthenticated]);
  const inputHandler = (e) =>
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  const submitHandler = (e) =>
    signUpHandler(e, setFormFields, login, formFields);
  return (
    <div className="flex bg-light_background h-screen w-screen items-center justify-center ">
      {loader ? (
        <div className="flex flex-col items-center">
          <Loader />
          <h2>Signing you in</h2>
        </div>
      ) : (
        <form
          onSubmit={submitHandler}
          className="flex bg-glass backdrop-blur-md shadow-[0_8px_32px_0_rgba(51, 84, 155, 0.527)] flex-col rounded p-4 gap-4 w-80"
        >
          {" "}
          <InputSimple
            title="Name"
            inputName="name"
            inputClass="p-1 w-full"
            inputPlaceHolder="name..."
            inputType="text"
            inputValue={name}
            inputFunc={inputHandler}
          />
          <InputSimple
            title="Email"
            inputName="email"
            inputClass="p-1 w-full"
            inputPlaceHolder="email..."
            inputType="email"
            inputValue={email}
            inputFunc={inputHandler}
          />
          <InputPass
            title="Password"
            inputName="password"
            inputValue={password}
            inputFunc={inputHandler}
            inputClass="p-1 w-full"
            inputPlaceHolder="password..."
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
          />
          <InputPass
            title="Repeat Password"
            inputName="confirmPass"
            inputValue={confirmPass}
            inputFunc={inputHandler}
            inputClass="p-1 w-full"
            inputPlaceHolder="confirm password.."
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
          />
          <PassChecker pass={password} confirmPass={confirmPass} />
          {error ? (
            <span className="text-error">{message}!</span>
          ) : (
            <span className=" opacity-0 ">Good to go!</span>
          )}
          <span className="flex flex-col">
            Already a customer?
            <Link to="/signin">
              <span className="rounded py-0.5 px-1 pointer bg-secondary font-bold">
                Log in here &gt;
              </span>
            </Link>
          </span>
          <Input
            inputType="submit"
            inputClass="rounded p-1 bg-primary text-secondary font-bold"
          />
        </form>
      )}
    </div>
  );
}
