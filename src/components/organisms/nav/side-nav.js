import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useData } from "../../../helpers/context";
import { Button } from "../../index";
import "./side-nav.css";
const SideNav = () => {
  const {
    setModalStatus,
    data: { pinnedNotes, unPinnedNotes },
  } = useData();
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

  const activeClass = ({ isActive }) =>
    isActive ? "bg-glass text-secondary font-bold" : "";
  return (
    <div className="flex flex-[1] pr-2 bg-light_background text-lg flex-col pl-2 pt-2 top-0 left-0 sticky h-[100vh]">
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
        {tags?.map((tag) => (
          <NavLink key={tag} className={activeClass} to={`/notes/${tag}`}>
            {tag}
          </NavLink>
        ))}
      </section>
    </div>
  );
};

export { SideNav };
