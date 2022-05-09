import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NoteCard } from "../../components";
import { useAuth, useData } from "../../helpers/context";
import { getNotes } from "../../helpers/utils";

const NotesScreen = () => {
  let { tag } = useParams();
  const { token } = useAuth();
  const { data, dispatchData, setLoader, loader } = useData();
  useEffect(() => {
    (async () => {
      setLoader(true);
      await getNotes(token, dispatchData, tag);
      setLoader(false);
    })();
  }, []);
  const { pinnedNotes, unPinnedNotes } = data;
  return (
    !loader && (
      <div className="flex flex-[4] flex-col pt-2 pl-5 gap-8">
        <h1 className="text-xl text-primary font-bold">Pinned Notes</h1>
        <div className="flex flex-wrap gap-2 justify-around">
          {!pinnedNotes.length > 0
            ? "No pinned Notes as of now"
            : pinnedNotes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
        </div>

        <h1 className="text-xl text-primary font-bold">Un-Pinned Notes</h1>
        <div className="flex flex-wrap gap-2 justify-around">
          {!unPinnedNotes.length > 0
            ? "Please add some notes to start"
            : unPinnedNotes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
        </div>
      </div>
    )
  );
};

export { NotesScreen };
