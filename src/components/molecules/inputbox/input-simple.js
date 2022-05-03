import { Input } from "../../atomic/input";

export function InputSimple({
  title: name,
  inputClass,
  inputPlaceHolder,
  inputType,
  inputValue,
  inputFunc,
  pattern,
}) {
  return (
    <label className="flex flex-col ">
      <span>{name}</span>
      <Input
        inputClass={inputClass}
        inputType={inputType}
        pattern={pattern}
        inputPlaceHolder={inputPlaceHolder}
        inputValue={inputValue}
        inputFunc={inputFunc}
      />
    </label>
  );
}
