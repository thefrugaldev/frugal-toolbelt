import * as React from "react";
import { FC } from "react";

interface Props {
  name: String;
  label?: String;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value: string;
  error?: String;
}

const TextArea: FC<Props> = props => {
  let textAreaClass = "textarea";
  if (props.error && props.error.length > 0) {
    textAreaClass += " " + "is-danger";
  }

  return (
    <div className="field">
      {props.label && (
        <label className="label" htmlFor={name}>
          {props.label}
        </label>
      )}
      <div className="control">
        <textarea
          name={name}
          value={props.value}
          className={textAreaClass}
          placeholder={props.placeholder}
          onChange={props.onChange}
        ></textarea>
        {props.error && <p className="help is-danger">{props.error}</p>}
      </div>
    </div>
  );
};

export default TextArea;
