import * as React from "react";
import { FC, useEffect } from "react";
// import bulmaCalendar from "bulma-calendar";
// import * as bulmaCalendar from "bulma-calendar/dist/js/bulma-calendar.min";

interface Props {
  name: String;
  label?: String;
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  value: string;
  error?: String;
}

const DateInput: FC<Props> = props => {
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
  if (props.error && props.error.length > 0) {
    inputClass += " " + "is-danger";
  }

  return (
    <div className="field">
      {props.label && (
        <label className="label" htmlFor={name}>
          {props.label}
        </label>
      )}
      <div className="control">
        <input
          type="date"
          name={name}
          className={inputClass}
          id="datepicker"
          placeholder={props.placeholder}
          onChange={() => props.onChange}
        />
        {props.error && <p className="help is-danger">{props.error}</p>}
      </div>
    </div>
  );
};

export default DateInput;
