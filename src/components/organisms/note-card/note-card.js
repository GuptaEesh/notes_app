import React, { useEffect, useRef, useState } from "react";
import { useAuth, useData } from "../../../helpers/context";
import { BsFillPinFill, BsPin } from "react-icons/bs";
import { MdDelete, MdEditNote } from "react-icons/md";
import { handleNotePin, deleteNote } from "../../../helpers/utils";
import { SmallLoader } from "../../atomic/loader/small-loader";
const NoteCard = ({ note }) => {
  const [pinLoader, setPinLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const { token } = useAuth();
  const { dispatchData, setModalStatus } = useData();
  const descriptionRef = useRef();
  const { title, description: desc, isPinned, tag, bgColor: color } = note;
  useEffect(() => {
    descriptionRef.current.innerHTML = desc;
  }, [desc]);
  const handlePin = () => {
    handleNotePin(note, token, dispatchData, setPinLoader);
  };
  const handleDelete = () => {
    deleteNote(note, token, dispatchData, setDeleteLoader);
  };
  const handleEdit = () => {
    dispatchData({ type: "EDIT_NOTE_FORM", payload: note });
    setModalStatus();
  };

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="p-2 shadow-[0_0_5px_0_var(--color-primary)] rounded-md flex flex-col w-full h-[10rem] relative"
    >
      <section className="border-b-2 py-0.5 mb-1 flex justify-between ">
        <h1 className="text-ellipsis overflow-hidden whitespace-nowrap w-[100px] mr-3 font-bold">
          {title[0].toUpperCase() + title.substring(1, title.length)}
        </h1>
        <h2 className=" bg-secondary whitespace-nowrap max-w-[250px] font-medium px-2 text-ellipsis overflow-hidden">
          {tag}
        </h2>
      </section>
      <section ref={descriptionRef}></section>

      <section className="bg-glass rounded flex flex-col items-center gap-2 absolute p-1 right-2  top-1/3">
        <div className=" bg-secondary cursor-pointer rounded-full ">
          {pinLoader ? (
            <SmallLoader />
          ) : isPinned ? (
            <BsFillPinFill
              onClick={handlePin}
              className=" p-0.5 text-2xl text-primary"
            />
          ) : (
            <BsPin
              onClick={handlePin}
              className="p-0.5 text-2xl text-primary"
            />
          )}
        </div>
        <div className=" cursor-pointer bg-secondary rounded-full">
          {deleteLoader ? (
            <SmallLoader />
          ) : (
            <MdDelete
              onClick={handleDelete}
              className=" text-2xl p-0.5 text-primary"
            />
          )}
        </div>
        <div className=" cursor-pointer bg-secondary rounded-full">
          <MdEditNote
            onClick={handleEdit}
            className=" text-2xl p-0.5 text-primary"
          />
        </div>
      </section>
    </div>
  );
};

export { NoteCard };
