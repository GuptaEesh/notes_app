import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="flex flex-col items-center justify-center sticky top-0 left-0">
      <h1>Attract</h1>
      <NavLink to="/notes/home">Home</NavLink>
    </div>
  );
};

export { SideNav };
