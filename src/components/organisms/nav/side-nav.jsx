import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BsFillMoonFill,
  BsFillSunFill,
  BiArchive,
  BiTrash,
  AiOutlineLogout,
  IoMdArrowRoundBack,
} from "../../../icons-used";
import { useAuth, useData } from "../../../helpers/context";
import { Button } from "../../index";
import "./side-nav.css";
import { requests } from "../../../helpers/utils";

const SideNav = ({ showNav, setShowNav, darkMode, changeTheme }) => {
  const {
    setModalStatus,
    data: { pinnedNotes, unPinnedNotes },
  } = useData();
  const clickRef = useRef();
  const outsideRef = useRef();
  const { logout } = useAuth();
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    setNotes([...pinnedNotes, ...unPinnedNotes]);
  }, [pinnedNotes, unPinnedNotes]);
  useEffect(() => {
    const closeSideNavHandler = (e) => {
      if (!clickRef.current?.contains(e.target)) {
        setShowNav(!showNav);
      }
    };
    outsideRef.current.addEventListener("mousedown", closeSideNavHandler);
  }, []);
  let tags = Object.keys(
    notes?.reduce(
      (tagsCollector, note) => ({
        ...tagsCollector,
        [note.tag.toLowerCase()]: 1,
      }),
      {}
    )
  );

  const activeClass = ({ isActive }) =>
    isActive ? "bg-glass font-bold ml-2 nav-icon2" : "";
  const activeClass2 = ({ isActive }) =>
    isActive
      ? "bg-glass gap-4 p-2 font-bold flex my-2 items-center nav-icon"
      : "flex items-center p-2 gap-1 my-2";
  return (
    <div
      ref={outsideRef}
      className={` z-10 backdrop-blur-2xl md:w-[14rem] absolute w-full md:sticky lg:sticky top-0 left-0 transform ease-in-out transition duration-300 md:translate-x-0 ${
        showNav ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        ref={clickRef}
        className="flex flex-[1] pr-2 bg-light_background text-lg flex-col pl-2 pt-2 h-[100vh] sticky w-[14rem] "
      >
        <section className="flex flex-col items-center mb-[3rem] justify-between">
          <IoMdArrowRoundBack
            className="cursor-pointer md:hidden lg:hidden self-start text-2xl flex text-secondary mb-[2rem]"
            onClick={() => setShowNav(!showNav)}
          />
          <section className="flex items-center justify-between w-full md:mt-[3.75rem] lg:mt-[3.75rem]">
            <h1 className="text-3xl text-primary">Attr🔷ct</h1>
            {darkMode ? (
              <BsFillSunFill className="cursor-pointer" onClick={changeTheme} />
            ) : (
              <BsFillMoonFill
                className="cursor-pointer"
                onClick={changeTheme}
              />
            )}
          </section>
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
    </div>
  );
};

export { SideNav };
