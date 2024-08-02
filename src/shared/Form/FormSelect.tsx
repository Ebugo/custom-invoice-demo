"use client";
import { ChangeEventHandler, FC, ReactNode } from "react";
import FormLabel from "./FormLabel";
import { IOptionsType } from "@/types";

const FormSelect: FC<{
  id?: string;
  label?: string;
  name: string;
  defaultValue?: string;
  options: IOptionsType[] | ReactNode;
  error?: string;
  overrideOptions?: boolean;
  touched?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}> = ({
  id,
  label,
  options = [],
  error,
  touched = false,
  name,
  defaultValue,
  overrideOptions,
  value,
  onChange,
  ...rest
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && <FormLabel htmlFor={name} label={label} />}
      <select
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        id={id || name}
        name={name}
        className={`border border-gray-500 rounded-sm h-[40px] px-1 w-full ${
          error && touched ? "border-red-600" : ""
        }`}
        {...rest}
      >
        {!overrideOptions
          ? Array.isArray(options) &&
            options.length > 0 &&
            typeof options[0] !== "string"
            ? (options as IOptionsType[])?.map((option, i) => (
                <option
                  className="shadow-none ring-0 px-2 h-[40px] rounded-sm w-full"
                  key={i}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))
            : (options as string[])?.map((option, i) => (
                <option
                  className="shadow-none ring-0 px-2 h-[40px] rounded-sm w-full"
                  key={i}
                  value={option}
                >
                  {option}
                </option>
              ))
          : (options as ReactNode)}
      </select>
      {error && touched && (
        <span className="text-sm text-red-600">{error}</span>
      )}
    </div>
  );
};

export default FormSelect;
