import { requests } from "./constants";
import { axios } from "./index";

const loginHandler = async (e, setFormFields, login, formFields) => {
  const { email, password } = formFields;
  e.preventDefault();
  try {
    setFormFields({ ...formFields, loader: true });
    const { data } = await axios.post(requests.login, {
      email,
      password,
    });
    login(data);
  } catch (err) {
    setFormFields({ ...formFields, error: true });
  } finally {
    setFormFields({
      ...formFields,
      email: "",
      password: "",
      error: true,
      loader: false,
    });
  }
};
const signUpHandler = async (e, setFormFields, login, formFields) => {
  const { name, email, password, confirmPass } = formFields;
  e.preventDefault();
  try {
    if (password !== confirmPass) throw "passwordError";
    setFormFields({ ...formFields, loader: true });
    const { data } = await axios.post(requests.signup, {
      email,
      password,
    });
    login(data);
  } catch (err) {
    setFormFields({
      ...formFields,
      error: true,
      message:
        err === "passwordError"
          ? "Passwords don't match"
          : "Directly login, you are our user.",
    });
  } finally {
    setFormFields({ ...formFields, loader: false });
  }
};
export { loginHandler, signUpHandler };
