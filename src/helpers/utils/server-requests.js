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
    setFormFields({ ...formFields, loader: false });
    login(data);
  } catch (err) {
    setFormFields({ ...formFields, error: true });
  }
};
const signUpHandler = async (e, setFormFields, login, formFields) => {
  const { name, email, password, confirmPass } = formFields;

  e.preventDefault();
  if (password !== confirmPass) {
    setFormFields({
      ...formFields,
      error: true,
      message: "Passwords don't match!",
    });
    return;
  }

  try {
    setFormFields({
      ...formFields,
      loader: true,
    });
    const { data } = await axios.post(requests.signup, {
      email,
      password,
    });
    setFormFields({
      ...formFields,
      loader: false,
    });
    login(data);
  } catch (err) {
    setFormFields({
      ...formFields,
      error: true,
      message: "User already exists!",
    });
  }
};

const getNotes = async (token, dispatchData, tag) => {
  // const res = await axios.post(
  //   "/api/note",
  //   {
  //     title: "Note1",
  //     description: "ASDASd",
  //     styles: "SDFsdf",
  //     isEdit: false,
  //     isPinned: false,
  //     tag: "Hidf",
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );
  const res = await axios.get(`/api/note`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const notes =
    tag === "all"
      ? res.data.data
      : res.data.data.filter((note) => note.tag === tag);
  let pinnedNotes = [],
    unpinnedNotes = [];
  notes.forEach((note) => {
    if (note.isPinned) pinnedNotes = [...pinnedNotes, note];
    else unpinnedNotes = [...unpinnedNotes, note];
  });
  dispatchData({
    type: "UPDATE_NOTES",
    payload: { pinned: pinnedNotes, unPinned: unpinnedNotes },
  });
};
export { loginHandler, signUpHandler, getNotes };
