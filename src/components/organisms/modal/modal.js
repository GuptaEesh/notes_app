import { Button } from "../../atomic/button/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./modal.css";
import { Input } from "../../atomic/input";
import { BsFillPinFill, BsPin } from "react-icons/bs";
import { useAuth, useData } from "../../../helpers/context";
import { addNote, updateNote } from "../../../helpers/utils";

const AddNoteModal = () => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["clean"],
    ],
  };
  const {
    data: { singleNote },
    dispatchData,
    setLoader,
    setModalStatus,
  } = useData();
  const { token } = useAuth();
  const closeModal = () => {
    dispatchData({ type: "RESET_NOTE" });
    setModalStatus();
  };
  const handlePin = () => {
    dispatchData({ type: "IS_PINNED" });
  };
  const inputHandler = (e) => {
    dispatchData({ type: "FORM_DETAILS", payload: e });
  };

  const handleSelectedColor = (e) => {
    dispatchData({ type: "UPDATE_COLOR", payload: e });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    singleNote.isEdit
      ? updateNote(token, singleNote, dispatchData, setLoader)
      : addNote(token, singleNote, dispatchData, setLoader);
    dispatchData({ type: "RESET_NOTE" });

    setModalStatus();
  };

  const quillHandler = (e) => {
    dispatchData({
      type: "ADD_DESCRIPTION",
      payload: e,
    });
  };
  const bgColorsArray = ["#E0FFFF", "#87CEFA", "#DDA0DD", "#C0C0C0", "#90EE90"];

  return (
    <div className=" z-10 fixed backdrop-blur-[5px] h-screen w-screen bg-light_background flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className=" min-w-[20rem] w-[50%] bg-glass p-2  lg:h-[50vh] md:h-[50vh] h-[70vh] flex flex-col gap-4"
      >
        <Input
          inputType="text"
          inputName="title"
          inputClass="p-1 rounded w-full"
          inputValue={singleNote.title}
          inputFunc={inputHandler}
          inputPlaceHolder="title..."
        />
        <Input
          inputType="text"
          inputName="tag"
          inputClass="p-1 rounded w-full"
          inputValue={singleNote.tag}
          inputFunc={inputHandler}
          inputPlaceHolder="tag..."
        />
        <ReactQuill
          modules={modules}
          placeholder="description..."
          value={singleNote.description}
          onChange={quillHandler}
        />
        {/* <textarea
          className="p-1 rounded w-full h-[60%]"
          placeholder="Description .... "
          name="description"
          onChange={inputHandler}
          value={singleNote.description}
          required
        ></textarea> */}
        <section className="flex justify-between items-center p-2">
          <div
            className="flex gap-2 items-center p-2"
            onClick={handleSelectedColor}
          >
            {bgColorsArray.map((color) => (
              <div
                key={color.toString()}
                data-key={color}
                style={{ backgroundColor: color }}
                className={`${
                  singleNote.bgColor === color && "border-primary border-2"
                } cursor-grab rounded-full w-5 h-5 `}
              ></div>
            ))}
          </div>

          <div className=" p-2">
            {singleNote.isPinned ? (
              <BsFillPinFill
                onClick={handlePin}
                className="bg-secondary cursor-pointer rounded-full text-2xl p-0.5 text-primary"
              />
            ) : (
              <BsPin
                onClick={handlePin}
                className="bg-secondary cursor-pointer rounded-full text-2xl p-0.5 text-primary"
              />
            )}
          </div>
        </section>
        <div className="flex gap-2 self-center">
          <Input
            inputType="submit"
            inputClass="font-bold px-2 rounded p-1 bg-primary text-secondary"
            inputValue={singleNote.isEdit ? "Update Note" : "Add Note"}
          />
          <Button
            btnType="font-bold px-2 rounded p-1 bg-primary text-secondary"
            btnText="Close"
            btnFunc={closeModal}
          />
        </div>
      </form>
    </div>
  );
};

export { AddNoteModal };
