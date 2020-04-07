import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";

interface Props {
  name: string;
  label?: string;
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  value: string;
  error?: string;
}

const DateInput: React.FC<Props> = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error
}) => {
  const datepicker = React.useRef();

  useEffect(() => {
    flatpickr(datepicker.current, {});
  }, []);

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
      <div className="control">
        <input
          type="date"
          ref={datepicker}
          name={name}
          className={inputClass}
          id="datepicker"
          placeholder={placeholder}
          onChange={() => onChange}
        />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

export default DateInput;
