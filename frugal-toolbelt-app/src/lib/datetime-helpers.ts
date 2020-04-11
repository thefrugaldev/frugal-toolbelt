const monthNames: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDateProps = (dateAsString: string): any => {
  const date = new Date(dateAsString);
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return {
    month,
    day,
    year,
  };
};

const getDisplayFormattedDate = (dateAsString: string): string => {
  const date = getDateProps(dateAsString);
  return `${date.month}/${date.day}/${date.year}`;
};

export { monthNames, getDisplayFormattedDate };
