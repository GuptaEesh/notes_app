import React from "react";
import { useAuth, useData } from "../../../helpers/context";
import { BsFillPinFill, BsPin } from "react-icons/bs";
import { updateNote } from "../../../helpers/utils";

const NoteCard = ({ note }) => {
  const { _id, title, description: desc, isPinned, tag, styles } = note;
  const { token } = useAuth();
  const { dispatchData } = useData();
  const handlePin = () => {
    updateNote(note, token, dispatchData);
  };
  const stylesApplied = JSON.parse(styles);
  const { color, bold, italic } = stylesApplied;
  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="p-2 border-4 border-glass rounded-md flex flex-col w-[25rem] h-[10rem] relative"
    >
      <section className="border-b-2 py-0.5 mb-1 flex justify-between">
        <h1>{title}</h1>
        <h2 className=" bg-secondary font-medium px-2 ">{tag}</h2>
      </section>
      <span className={`  font-${bold && "bold"} ${italic && "italic"} px-2 `}>
        {desc}
      </span>
      <div className=" p-2">
        {isPinned ? (
          <BsFillPinFill
            onClick={handlePin}
            className="bg-secondary absolute right-2 cursor-pointer rounded-full text-3xl p-1 text-primary"
          />
        ) : (
          <BsPin
            onClick={handlePin}
            className="bg-secondary absolute right-2  cursor-pointer rounded-full text-3xl p-1 text-primary"
          />
        )}
      </div>
    </div>
  );
};

export { NoteCard };
