import React from "react";
import { NoteCard } from "../../components";
import { useData } from "../../helpers/context";
const Trash = () => {
  const {
    data: { pinnedNotes, unPinnedNotes },
    loader,
  } = useData();
  const trashData = [...pinnedNotes, ...unPinnedNotes].filter(
    (note) => note.isTemporarilyDeleted && !note.isArchived
  );
  return (
    !loader && (
      <div className="min-h-screen flex flex-[5] text-primary flex-col pt-2 px-5 gap-8 pb-2 bg-bgColor">
        <h2 className=" text-center text-heading font-bold text-2xl">
          Trash Notes
        </h2>
        {trashData.length ? (
          <div className="grid grid-cols-1 text-heading md:grid-cols-2 lg:grid-cols-3 gap-2">
            {trashData.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <span className="text-center text-heading">
            No notes added to trash
          </span>
        )}
      </div>
    )
  );
};

export { Trash };
