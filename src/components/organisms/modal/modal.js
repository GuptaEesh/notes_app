import React from "react";
import { Button } from "../../atomic/button/button";
import { Input } from "../../atomic/input";
import { BsFillPinFill } from "react-icons/bs";
const AddNoteModal = ({ setModalStatus }) => {
  return (
    <div className="fixed backdrop-blur-[2px] h-screen w-screen bg-light_background flex items-center justify-center">
      <div className=" min-w-[20rem] w-[50%] bg-glass p-2  h-[50vh] flex flex-col gap-4">
        <Input
          inputType="text"
          inputName="title"
          inputClass="p-1 rounded w-full"
          // inputValue={}
          // inputFunc={}
          inputPlaceHolder="title..."
        />
        <textarea
          className="p-1 rounded w-full h-[60%]"
          placeholder="Description .... "
        ></textarea>
        <div className="flex gap-2 items-center relative p-2">
          {["green", "yellow", "blue", "white"].map((color) => (
            <div
              key={color.toString()}
              style={{ backgroundColor: color }}
              className=" cursor-grab rounded-full w-5 h-5 "
            ></div>
          ))}
          <BsFillPinFill className="right-0 absolute bg-secondary cursor-pointer rounded-full text-2xl p-0.5 text-primary" />
        </div>
        <div className="flex gap-2 self-center">
          <Button
            btnType="font-bold px-2 rounded p-1 bg-primary text-secondary"
            btnText="Add Note"
            // btnFunc={}
          />
          <Button
            btnType="font-bold px-2 rounded p-1 bg-primary text-secondary"
            btnText="Close"
            btnFunc={setModalStatus}
          />
        </div>
      </div>
    </div>
  );
};

export { AddNoteModal };
