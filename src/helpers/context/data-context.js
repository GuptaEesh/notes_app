import { createContext, useContext, useReducer } from "react";

const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const initialData = {
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
