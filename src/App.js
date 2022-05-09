import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AddNoteModal, SideNav } from "./components";
import { Home, LoginScreen, SignUpScreen, NotesScreen } from "./pages";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const setModalStatus = () => setIsModalOpen(!isModalOpen);
  const routeCheck =
    location.pathname === "/" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup";
  return (
    <div className="App">
      {!routeCheck && <SideNav setModalStatus={setModalStatus} />}
      {isModalOpen && <AddNoteModal setModalStatus={setModalStatus} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/notes/:tag" element={<NotesScreen />} />
      </Routes>
    </div>
  );
}

export default App;
