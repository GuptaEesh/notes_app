import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NoteCard } from "../../components";
import { useAuth, useData } from "../../helpers/context";
import { getNotes } from "../../helpers/utils";

const NotesScreen = () => {
  let { tag } = useParams();
  const { token } = useAuth();
  const { data, dispatchData, setLoader, loader } = useData();
  const [pinned, setPinned] = useState([]);
  const [unPinned, setUnPinned] = useState([]);
  const navigate = useNavigate();
  const { pinnedNotes, unPinnedNotes } = data;
  useEffect(() => {
    (async () => {
      setLoader(true);
      await getNotes(token, dispatchData, tag);
      setLoader(false);
    })();
  }, []);
  useEffect(() => {
    if (
      ![...pinnedNotes, ...unPinnedNotes].some((note) => note.tag === tag) &&
      tag !== "all"
    ) {
      navigate("/notes/all");
    } else {
      if (tag !== "all") {
        setPinned(
          pinnedNotes.filter(
            (note) => note.tag.toLowerCase() === tag.toLowerCase()
          )
        );
        setUnPinned(
          unPinnedNotes.filter(
            (note) => note.tag.toLowerCase() === tag.toLowerCase()
          )
        );
      } else {
        setPinned(pinnedNotes);
        setUnPinned(unPinnedNotes);
      }
    }
  }, [tag, pinnedNotes, unPinnedNotes]);

  return (
    !loader && (
      <div className="flex flex-[4] flex-col pt-2 px-5 gap-8 mb-2">
        <h2 className="text-center font-bold text-2xl">
          Tag :- {tag[0].toUpperCase() + tag.slice(1, tag.length)}
        </h2>
        <h1 className="text-xl text-primary font-bold">Pinned Notes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {!pinned.length > 0
            ? "No pinned Notes as of now"
            : pinned.map((note) => <NoteCard key={note._id} note={note} />)}
        </div>

        <h1 className="text-xl text-primary font-bold">Un-Pinned Notes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {!unPinned.length > 0
            ? "Please add some notes to start"
            : unPinned.map((note) => <NoteCard key={note._id} note={note} />)}
        </div>
      </div>
    )
  );
};

export { NotesScreen };
