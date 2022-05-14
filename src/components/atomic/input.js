import React from "react";
export const Input = ({
  inputClass,
  checkStatus,
  pattern,
  inputFunc,
  inputName,
  inputPlaceHolder,
  inputType,
  inputValue,
}) => {
  return (
    <input
      checked={checkStatus}
      type={inputType}
      pattern={pattern}
      value={inputValue}
      name={inputName}
      onChange={inputFunc}
      className={inputClass}
      placeholder={inputPlaceHolder}
      required
    />
  );
};
