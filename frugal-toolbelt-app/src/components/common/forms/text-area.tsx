import * as React from "react";
import { FC } from "react";

interface Props {
  name: string;
  label?: string;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value: string;
  error?: string;
}

const TextArea: FC<Props> = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error
}) => {
  let textAreaClass = "textarea";
  if (error && error.length > 0) {
    textAreaClass += " " + "is-danger";
  }

  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="control">
        <textarea
          name={name}
          value={value}
          className={textAreaClass}
          placeholder={placeholder}
          onChange={onChange}
        ></textarea>
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

export default TextArea;
