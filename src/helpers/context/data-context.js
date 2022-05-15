import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { dataReducer, getNotes, initialData } from "../utils";
import { useAuth } from "./auth-context";

const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [data, dispatchData] = useReducer(dataReducer, initialData);
  const [loader, setLoader] = useState(false);
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setModalStatus = () => setIsModalOpen(!isModalOpen);
  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        await getNotes(token, dispatchData);
        setLoader(false);
      } finally {
        setLoader(false);
      }
    })();
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        data,
        isModalOpen,
        setModalStatus,
        loader,
        setLoader,
        dispatchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);
export { useData, DataProvider };
