import React from "react";

const NoteCard = ({ note }) => {
  const { _id, title, description: desc, isPinned, isEdit, tag, styles } = note;
  return (
    <div
      style={{ backgroundColor: `${"red"}` }}
      className="p-2 flex flex-col w-[25rem] h-[10rem] border-2"
    >
      <section className="border-b-2 py-0.5 mb-1 flex justify-between">
        <h1>{title}</h1>
        <h2 className=" bg-secondary px-2 font-medium">{tag}</h2>
      </section>
      {desc}
    </div>
  );
};

export { NoteCard };
