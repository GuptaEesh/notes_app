import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AddNoteModal, Loader, SideNav } from "./components";
import { useData } from "./helpers/context";
import { Home, LoginScreen, SignUpScreen, NotesScreen } from "./pages";

function App() {
  const { loader, isModalOpen } = useData();
  const location = useLocation();

  const routeCheck =
    location.pathname === "/" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup";
  return (
    <div className="App flex">
      {!routeCheck && <SideNav />}
      {isModalOpen && <AddNoteModal />}
      {loader && (
        <div className="flex flex-[4] flex-col pl-6 gap-8 items-center justify-center">
          <Loader />
        </div>
      )}
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
