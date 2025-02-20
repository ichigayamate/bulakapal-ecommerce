import {InputHTMLAttributes} from "react";
import {Control, FieldValues, useController} from "react-hook-form";

interface InputProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  control: Control<FieldValues, T>
  noBorder?: boolean
}

export default function Input({name, control, required, noBorder, defaultValue, ...props}: Readonly<InputProps<string>>) {
  const {field} = useController({
    name,
    control,
    rules: {required},
    defaultValue: defaultValue || "",
  })

  return <input
    name={name}
    value={field.value}
    onChange={field.onChange}
    className={`input w-full ${!noBorder ? "input-bordered" : ""} ${props.className ?? ""}`}
    required={required}
    {...props}
  />
}