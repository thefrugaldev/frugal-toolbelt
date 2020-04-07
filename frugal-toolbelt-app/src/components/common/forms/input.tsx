import * as React from "react";
import { FC } from "react";

interface Props {
  name: string;
  type: string;
  label?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
  error?: string;
}

const Input: FC<Props> = ({
  name,
  type,
  label,
  onChange,
  placeholder,
  value,
  error
}) => {
  let inputClass = "input";
  if (error && error.length > 0) {
    inputClass += " " + "is-danger";
  }

  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="control is-expanded">
        <input
          type={type}
          name={name}
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

export default Input;
