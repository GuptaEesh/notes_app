import { createContext, useContext, useReducer } from "react";

const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const initialData = {
    singleNote: {
      title: "",
      description: "",
      isPinned: false,
      isEdit: false,
      tag: "",
    },
    pinnedNotes: [],
    unPinnedNotes: [],
  };
  const dataReducer = (data, action) => {
    const { type, payload } = action;
    switch (type) {
      case "UPDATE_NOTES":
        return {
          ...data,
          pinnedNotes: payload.pinned,
          unPinnedNotes: payload.unPinned,
        };
      case "RESET_NOTE":
        return {
          ...data,
          singleNote: initialData.singleNote,
        };
      case "IS_PINNED":
        return {
          ...data,
          singleNote: {
            ...data.singleNote,
            isPinned: !data.singleNote.isPinned,
          },
        };
      case "FORM_DETAILS":
        return {
          ...data,
          singleNote: {
            ...data.singleNote,
            [payload.target.name]: payload.target.value,
          },
        };
      case "UPDATE_COLOR":
        return {
          ...data,
          singleNote: {
            ...data.singleNote,
            styles: {
              ...data.singleNote.styles,
              color: payload.target.dataset.key,
            },
          },
        };
      case "TEXT_TO_BOLD":
        return {
          ...data,
          singleNote: {
            ...data.singleNote,
            styles: {
              ...data.singleNote.styles,
              bold: !data.singleNote.styles.bold,
            },
          },
        };
      case "TEXT_TO_ITALIC":
        return {
          ...data,
          singleNote: {
            ...data.singleNote,
            styles: {
              ...data.singleNote.styles,
              italic: !data.singleNote.styles.italic,
            },
          },
        };

      default:
        return data;
    }
  };
  const [data, dispatchData] = useReducer(dataReducer, initialData);
  return (
    <DataContext.Provider value={{ data, dispatchData }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);
export { useData, DataProvider };
