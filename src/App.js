import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { SideNav } from "./components";
import { Home, LoginScreen, SignUpScreen } from "./pages";

function App() {
  const location = useLocation();
  const routeCheck =
    location.pathname === "/" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup";
  return (
    <div className="App ">
      {!routeCheck && <SideNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
      </Routes>
    </div>
  );
}

export default App;
