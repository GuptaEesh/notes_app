import { useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { Input } from "../../atomic/input";
export function InputPass({
  title: name,
  inputClass,
  inputPlaceHolder,
  inputValue,
  inputFunc,
  pattern,
}) {
  const [visibility, setVisibility] = useState(false);
  return (
    <label className="flex flex-col ">
      <span>{name}</span>
      <div className="w-full relative flex items-center">
        <Input
          inputClass={inputClass}
          inputType={visibility ? "text" : "password"}
          inputPlaceHolder={inputPlaceHolder}
          pattern={pattern}
          inputValue={inputValue}
          inputFunc={inputFunc}
        />
        {visibility ? (
          <BsEyeSlash
            onClick={() => setVisibility(!visibility)}
            className="absolute cursor-pointer right-1 text-primary"
          />
        ) : (
          <BsEyeFill
            onClick={() => setVisibility(!visibility)}
            className="absolute cursor-pointer right-1 text-primary"
          />
        )}
      </div>
    </label>
  );
}
