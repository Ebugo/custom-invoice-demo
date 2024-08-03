"use client";
import { FC } from "react";

const FormLabel: FC<{ htmlFor?: string; label: string; optional?: string }> = ({
  htmlFor,
  label,
  optional,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-[var(--green-12)]"
    >
      {label} <span>{optional}</span>
    </label>
  );
};

export default FormLabel;
