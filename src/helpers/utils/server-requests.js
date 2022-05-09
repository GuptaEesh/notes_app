import { requests } from "./constants";
import { axios } from "./index";

const updateNoteRealTime = (data, dispatch) => {
  let pinnedNotes = [],
    unpinnedNotes = [];
  data.forEach((note) => {
    if (note.isPinned) pinnedNotes = [...pinnedNotes, note];
    else unpinnedNotes = [...unpinnedNotes, note];
  });
  dispatch({
    type: "UPDATE_NOTES",
    payload: { pinned: pinnedNotes, unPinned: unpinnedNotes },
  });
};

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
  const res = await axios.get(`/api/note`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const notes =
    tag === "all"
      ? res.data.data
      : res.data.data.filter((note) => note.tag === tag);
  updateNoteRealTime(notes, dispatchData);
};
const addNote = async (token, note, dispatchData) => {
  console.log(note);
  const response = await axios.post(
    "/api/note",
    { ...note, styles: JSON.stringify(note.styles) },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  updateNoteRealTime(response.data.data, dispatchData);
};
const updateNote = async (note, token, dispatchData) => {
  const response = await axios.put(
    `/api/note/${note._id}`,
    { ...note, isPinned: !note.isPinned },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  updateNoteRealTime(response.data.data, dispatchData);
};

export { loginHandler, signUpHandler, getNotes, addNote, updateNote };
