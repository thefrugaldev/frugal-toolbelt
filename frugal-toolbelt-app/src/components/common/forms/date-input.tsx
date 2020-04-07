import * as React from "react";
import { FC, useEffect } from "react";
// import bulmaCalendar from "bulma-calendar";
// import * as bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.min";

interface Props {
  name: string;
  label?: string;
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  value: string;
  error?: string;
}

const DateInput: FC<Props> = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error
}) => {
  // useEffect(() => {
  //   // Initialize all input of date type.
  //   const calendars = bulmaCalendar.attach('[type="date"]', {
  //     startDate: new Date(props.value)
  //   });

  //   // Loop on each calendar initialized
  //   calendars.forEach(calendar => {
  //     // Add listener to date:selected event
  //     // calendar.on("select", date => {
  //     //   () =>
  //     //     props.onChange({
  //     //       target: {
  //     //         name,
  //     //         value: date.data.value()
  //     //       }
  //     //     });
  //     // });
  //   });
  // }, []);

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
