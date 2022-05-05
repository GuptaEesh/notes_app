import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader, NoteCard } from "../../components";
import { useAuth, useData } from "../../helpers/context";
import { getNotes } from "../../helpers/utils";

const NotesScreen = () => {
  let { tag } = useParams();
  const { token } = useAuth();
  const { data, dispatchData } = useData();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    (async () => {
      setLoader(true);
      await getNotes(token, dispatchData, tag);
      setLoader(false);
    })();
  }, [tag]);
  const { pinnedNotes, unPinnedNotes } = data;
  return loader ? (
    <div className="flex flex-col w-[calc(100%-30vw)] items-center justify-center">
      <Loader />
      Loading your notes..
    </div>
  ) : (
    <div className="flex flex-col pl-5">
      <div className="flex flex-wrap justify-around">
        {!pinnedNotes.length > 0
          ? "No pinned Notes as of now"
          : pinnedNotes.map((note) => <NoteCard key={note._id} note={note} />)}
      </div>

      <div className="flex flex-wrap justify-around">
        {!unPinnedNotes.length > 0
          ? "Please add some notes to start"
          : unPinnedNotes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
      </div>
    </div>
  );
};

export { NotesScreen };
