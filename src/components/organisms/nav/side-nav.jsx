import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BsFillMoonFill,
  BsFillSunFill,
  BiArchive,
  BiTrash,
  AiOutlineLogout,
} from "../../../helpers/icons/icons-used";
import { useAuth, useData } from "../../../helpers/context";
import { Button } from "../../index";
import "./side-nav.css";
import { requests } from "../../../helpers/utils";
const SideNav = ({ darkMode, changeTheme }) => {
  const {
    setModalStatus,
    data: { pinnedNotes, unPinnedNotes },
  } = useData();
  const { logout } = useAuth();
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    setNotes([...pinnedNotes, ...unPinnedNotes]);
  }, [pinnedNotes, unPinnedNotes]);
  let tags = Object.keys(
    notes?.reduce(
      (tagsCollector, note) => ({
        ...tagsCollector,
        [note.tag.toLowerCase()]: 1,
      }),
      {}
    )
  );

  const activeClass = ({ isActive }) => (isActive ? "bg-glass font-bold" : "");
  const activeClass2 = ({ isActive }) =>
    isActive
      ? "bg-glass gap-4 p-2 font-bold flex items-center nav-icon"
      : "flex items-center p-2 gap-1";
  return (
    <div className="flex flex-[1] pr-2 bg-light_background text-lg flex-col pl-2 pt-2 top-0 left-0 sticky h-[100vh] min-w-[12rem]">
      <section className="flex items-center mb-[5rem] mt-[2rem] justify-between">
        <h1 className="text-3xl text-primary">Attr🔷ct</h1>
        {darkMode ? (
          <BsFillSunFill onClick={changeTheme} />
        ) : (
          <BsFillMoonFill onClick={changeTheme} />
        )}
      </section>
      <Button
        btnType="font-bold rounded p-1 mb-5 bg-primary text-secondary"
        btnText="Add Note +"
        btnFunc={setModalStatus}
      />
      <NavLink className={activeClass2} to="/archive">
        <BiArchive className=" rounded-sm text-3xl" />
        <h1 className=" font-bold">Archived Notes</h1>
      </NavLink>
      <NavLink className={activeClass2} to="/trash">
        <BiTrash className="rounded-sm text-3xl" />
        <h1 className=" font-bold">Trash Notes</h1>
      </NavLink>

      <section className="flex flex-col gap-4 border-b-2 mb-2 text-primary side-nav overflow-y-auto pb-5 h-full">
        <NavLink className={activeClass} to={requests.notes}>
          All Notes
        </NavLink>
        {tags?.map((tag) => (
          <NavLink key={tag} className={activeClass} to={`/notes/${tag}`}>
            {tag}
          </NavLink>
        ))}
      </section>
      <div
        onClick={logout}
        className="cursor-pointer mb-5 self-start w-max rounded p-1 gap-2 bg-primary text-secondary flex items-center justify-center"
      >
        <h1 className="text-secondary font-bold">Log Out</h1>
        <AiOutlineLogout className="bg-secondary rounded-sm text-3xl" />
      </div>
    </div>
  );
};

export { SideNav };
