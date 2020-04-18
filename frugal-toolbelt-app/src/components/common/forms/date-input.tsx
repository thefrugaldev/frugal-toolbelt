import React, { useEffect } from "react";
import flatpickr from "flatpickr";

interface Props {
  name: string;
  label?: string;
  onChange: (any) => void;
  placeholder?: string;
  value: string;
  error?: string;
}

const DateInput: React.FC<Props> = ({
  name,
  label,
  onChange,
  placeholder,
  error,
  value,
}) => {
  const datepicker = React.useRef();

  useEffect(() => {
    flatpickr(datepicker.current, {
      defaultDate: value ? new Date(value) : new Date(),
      onChange: (selectedDates: any, dateStr: any, instance: any) => {
        onChange({
          currentTarget: {
            name: instance.element.name,
            value: dateStr,
          },
        });
      },
    });
  }, [value]);

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
          // onChange={(): void => {}}
        />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

export default DateInput;
