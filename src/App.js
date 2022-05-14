import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AddNoteModal, Loader, SideNav } from "./components";
import { useData } from "./helpers/context";
import { RedirectAuth } from "./helpers/router/redirects-auth";
import { RequireAuth } from "./helpers/router/requires-auth";
import { requests } from "./helpers/utils";
import {
  Home,
  LoginScreen,
  SignUpScreen,
  NotesScreen,
  Archive,
  Trash,
} from "./pages";

function App() {
  const { loader, isModalOpen } = useData();
  const [darkMode, setDarkMode] = useState(() =>
    JSON.parse(localStorage.getItem("darkTheme"))
  );
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("darkTheme", darkMode);
  }, [darkMode]);
  const changeTheme = () => {
    setDarkMode((mode) => !mode);
  };
  const routeCheck =
    location.pathname === "/" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup";
  return (
    <div className={`${darkMode ? "dark" : "App"} flex`}>
      {!routeCheck && <SideNav darkMode={darkMode} changeTheme={changeTheme} />}
      {isModalOpen && <AddNoteModal />}
      {loader && <Loader />}
      <Routes>
        <Route path={requests.home} element={<Home />} />
        <Route element={<RedirectAuth />}>
          <Route path={requests.login} element={<LoginScreen />} />
          <Route path={requests.signup} element={<SignUpScreen />} />
        </Route>
        <Route
          path="/notes/:tag"
          element={
            <RequireAuth>
              <NotesScreen />
            </RequireAuth>
          }
        />
        <Route
          path="/archive"
          element={
            <RequireAuth>
              <Archive />
            </RequireAuth>
          }
        />
        <Route
          path="/trash"
          element={
            <RequireAuth>
              <Trash />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
