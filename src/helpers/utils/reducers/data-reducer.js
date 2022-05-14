import { ACTION_TYPES } from "../constants";

const initialData = {
  singleNote: {
    title: "",
    description: "",
    isPinned: false,
    isEdit: false,
    tag: "",
    priority: 1,
    isArchived: false,
    isTemporarilyDeleted: false,
    bgColor: "white",
  },
  pinnedNotes: [],
  unPinnedNotes: [],
};
const dataReducer = (data, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.NOTES:
      return {
        ...data,
        pinnedNotes: payload.pinned,
        unPinnedNotes: payload.unPinned,
      };
    case ACTION_TYPES.RESET_NOTES:
      return {
        ...data,
        singleNote: initialData.singleNote,
      };
    case ACTION_TYPES.IS_PINNED:
      return {
        ...data,
        singleNote: {
          ...data.singleNote,
          isPinned: !data.singleNote.isPinned,
        },
      };
    case ACTION_TYPES.IS_ARCHIVED:
      return {
        ...data,
        singleNote: {
          ...data.singleNote,
          isArchived: !data.singleNote.isArchived,
        },
      };
    case ACTION_TYPES.IS_TEMPORARILY_DELETED:
      return {
        ...data,
        singleNote: {
          ...data.singleNote,
          isTemporarilyDeleted: !data.singleNote.isTemporarilyDeleted,
        },
      };
    case ACTION_TYPES.ADD_DESC:
      return {
        ...data,
        singleNote: {
          ...data.singleNote,
          description: payload,
        },
      };
    case ACTION_TYPES.FORM_DETAILS:
      return {
        ...data,
        singleNote: {
          ...data.singleNote,
          [payload.target.name]: payload.target.value,
        },
      };
    case ACTION_TYPES.EDIT_NOTE:
      return {
        ...data,
        singleNote: {
          ...payload,
          color: payload.color,
          isEdit: true,
        },
      };
    case ACTION_TYPES.UPDATE_COLOR:
      return {
        ...data,
        singleNote: {
          ...data.singleNote,
          bgColor: payload.target.dataset.key,
        },
      };
    case ACTION_TYPES.SET_PRIORITY:
      return {
        ...data,
        singleNote: {
          ...data.singleNote,
          priority: payload,
        },
      };

    default:
      return data;
  }
};
export { initialData, dataReducer };
