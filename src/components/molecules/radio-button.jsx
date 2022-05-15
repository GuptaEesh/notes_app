import { Input } from "../index"

export const Radio = ({ radioName, radioText, checkStatus, inputFunc }) => {
    return (
        <label className={`${checkStatus?" bg-primary text-secondary":null} cursor-pointer px-2 rounded-md flex items-center gap-2`}>
            <Input
                inputClass=" hidden "
                inputType="radio"
                inputFunc={inputFunc}
                inputName={radioName}
                checkStatus={checkStatus}
            />
            {radioText}
        </label>
    )
}
