import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}: InputFieldProps) => (
  <div>
    <label htmlFor={name} className="label text-primary ml-3">
      <span className="label-text">{label}</span>
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="input input-bordered w-full selection:bg-primary"
    />
  </div>
);

export default InputField;
