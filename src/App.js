import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AddNoteModal, Loader, SideNav } from "./components";
import { useData } from "./helpers/context";
import { RequireAuth } from "./helpers/router/requires-auth";
import { Home, LoginScreen, SignUpScreen, NotesScreen } from "./pages";

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
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route
          path="/notes/:tag"
          element={
            <RequireAuth>
              <NotesScreen />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
