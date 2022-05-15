import { Input } from "../../atomic/input";

export function InputSimple({
  title: name,
  inputClass,
  inputPlaceHolder,
  inputType,
  inputValue,
  inputFunc,
  inputName,
  pattern,
}) {
  return (
    <label className="flex flex-col ">
      <span className="text-heading">{name}</span>
      <Input
        inputClass={inputClass}
        inputType={inputType}
        pattern={pattern}
        inputPlaceHolder={inputPlaceHolder}
        inputValue={inputValue}
        inputFunc={inputFunc}
        inputName={inputName}
      />
    </label>
  );
}
