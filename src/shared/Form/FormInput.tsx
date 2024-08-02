"use client";
import { FC, ReactNode } from "react";
import FormLabel from "./FormLabel";

const FormInput: FC<{
  id?: string;
  label?: string;
  name: string;
  type?: string;
  placeholder: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: string;
  disabled?: boolean;
  touched?: boolean;
  readOnly?: boolean;
}> = ({
  id,
  label,
  name,
  placeholder,
  type = "text",
  startIcon,
  endIcon,
  error,
  disabled = false,
  touched = false,
  readOnly = false,
  ...rest
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <FormLabel htmlFor={name} label={label} />}
      <div
        className={`border border-gray-500 rounded-sm ${
          error && touched ? "border-red-600" : ""
        }`}
      >
        <input
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className="shadow-none ring-0 px-2 h-[40px] rounded-sm w-full"
          {...rest}
        />
      </div>
      {error && touched && (
        <span className="text-sm text-red-600">{error}</span>
      )}
    </div>
  );
};

export default FormInput;
