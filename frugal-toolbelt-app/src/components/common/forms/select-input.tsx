import * as React from "react";
import { FC } from "react";

interface Props {
  name: string;
  label?: string;
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  value: string;
  error?: string;
  defaultOption: string;
  options: Array<{ text: string; value: string }>;
}

const SelectInput: FC<Props> = ({
  name,
  label,
  onChange,
  value,
  error,
  defaultOption,
  options,
}) => {
  let selectClass = `select is-fullwidth`;
  if (error && error.length > 0) {
    selectClass += " " + "is-danger";
  }

  return (
    <div className="field">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="control is-expanded">
        <div className={selectClass}>
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="form-control"
          >
            <option value="">{defaultOption}</option>
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>
        {error && <div className="help is-danger">{error}</div>}
      </div>
    </div>
  );
};

export default SelectInput;
