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
    if (password !== confirmPass)
      throw Object.assign({}, { message: "Passwords don't match" });
    setFormFields({ ...formFields, loader: true });
    const { data } = await axios.post(requests.signup, {
      email,
      password,
    });
    login(data);
  } catch (err) {
    setFormFields({
      ...formFields,
      message: err.message,
    });
  } finally {
    setFormFields({
      ...formFields,
      error: true,
      loader: false,
    });
  }
};
export { loginHandler, signUpHandler };
