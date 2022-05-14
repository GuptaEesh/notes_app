import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Filter, NoteCard } from "../../components";
import { useData, useFilter } from "../../helpers/context";
import { requests } from "../../helpers/utils";

const NotesScreen = () => {
  let { tag } = useParams();
  const { finalArray } = useFilter();
  const { loader } = useData();
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const pinned = notes.filter(
    (note) => note.isPinned && !note.isArchived && !note.isTemporarilyDeleted
  );
  const unPinned = notes.filter(
    (note) => !note.isPinned && !note.isArchived && !note.isTemporarilyDeleted
  );
  useEffect(() => {
    if (
      !finalArray.some(
        (note) => note.tag.toLowerCase() === tag.toLowerCase()
      ) &&
      tag !== "all"
    ) {
      navigate(requests.notes);
    } else {
      if (tag !== "all") {
        setNotes(
          finalArray.filter(
            (note) => note.tag.toLowerCase() === tag.toLowerCase()
          )
        );
      } else {
        setNotes(finalArray);
      }
    }
  }, [tag, finalArray]);
  return (
    !loader && (
      <div className="flex flex-[5] text-primary flex-col pt-2 px-5 gap-8 pb-2 bg-bgColor">
        <section className="flex flex-col items-center">
          <h1 className="text-center font-bold  text-heading  text-2xl">Tag :- {tag[0].toUpperCase() + tag.slice(1, tag.length)}</h1>
          <h2 className="text-heading">Cards opacity depends on <span className="font-bold">priority</span></h2>
        </section>
        <Filter />
       
        <h1 className="text-xl text-heading font-bold">Pinned Notes</h1>
        <div className="grid grid-cols-1 text-heading md:grid-cols-2 lg:grid-cols-3 gap-2">
          {!pinned.length > 0
            ? "No pinned Notes as of now"
            : pinned.map((note) => <NoteCard key={note._id} note={note} />)}
        </div>

        <h1 className="text-xl text-heading font-bold">Un-Pinned Notes</h1>
        <div className="grid grid-cols-1 text-heading md:grid-cols-2 lg:grid-cols-3 gap-2">
          {!unPinned.length > 0
            ? "Please add some notes to start"
            : unPinned.map((note) => <NoteCard key={note._id} note={note} />)}
        </div>
      </div>
    )
  );
};

export { NotesScreen };
