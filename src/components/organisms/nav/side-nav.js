import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../helpers/context";
import { getNotes } from "../../../helpers/utils";
import { Button } from "../../index";
import "./side-nav.css";
const SideNav = ({ setModalStatus }) => {
  const { token } = useAuth();
  const activeClass = ({ isActive }) =>
    isActive ? "bg-glass text-secondary font-bold" : "";
  return (
    <div className="flex bg-light_background text-lg flex-col pl-2 pt-2 sticky top-0 left-0 h-[100vh] w-[30vh]">
      <h1 className="text-3xl mb-[5rem] mt-[2rem]">Attr🔷ct</h1>
      <Button
        btnType="font-bold rounded p-1 mb-5 bg-primary text-secondary"
        btnText="Add Note +"
        btnFunc={setModalStatus}
      />
      <section className="flex flex-col gap-4 side-nav overflow-y-auto pb-5 h-full">
        <NavLink className={activeClass} to={`/notes/${"all"}`}>
          All Notes
        </NavLink>
        <NavLink className={activeClass} to={`/notes/${"work"}`}>
          Work
        </NavLink>
        <NavLink className={activeClass} to="/notes/2">
          Play
        </NavLink>
      </section>
      <Button
        btnType="font-bold rounded p-1 mb-5 bg-primary text-secondary"
        btnText="Add Note +"
        btnFunc={() => getNotes(token)}
      />
    </div>
  );
};

export { SideNav };
