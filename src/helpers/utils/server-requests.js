import { ACTION_TYPES, requests } from "./constants";
import { axios } from "./index";

const updateNoteRealTime = (data, dispatch) => {
  let pinnedNotes = [],
    unpinnedNotes = [];
  data.forEach((note) => {
    if (note.isPinned) pinnedNotes = [...pinnedNotes, note];
    else unpinnedNotes = [...unpinnedNotes, note];
  });
  dispatch({
    type: ACTION_TYPES.NOTES,
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
      name,
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

const getNotes = async (token, dispatchData) => {
  const res = await axios.get(`/api/note`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data.data); //createdAt updatedAt
  updateNoteRealTime(res.data.data, dispatchData);
};
const addNote = async (token, note, dispatchData, setLoader) => {
  setLoader(true);
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
  setLoader(false);
};
const handleNotePin = async (note, token, dispatchData, setSmallLoader) => {
  setSmallLoader(true);
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
  setSmallLoader(false);
};
const deleteNote = async (note, token, dispatchData, setSmallLoader) => {
  setSmallLoader(true);
  const response = await axios.delete(`/api/note/${note._id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  updateNoteRealTime(response.data.data, dispatchData);
  setSmallLoader(false);
};

const updateNote = async (token, note, dispatchData, setLoader) => {
  setLoader(true);
  const response = await axios.put(
    `/api/note/${note._id}`,
    { ...note, styles: JSON.stringify(note.styles) },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  setLoader(false);
  updateNoteRealTime(response.data.data, dispatchData);
};

export {
  loginHandler,
  signUpHandler,
  getNotes,
  addNote,
  handleNotePin,
  updateNote,
  deleteNote,
};
