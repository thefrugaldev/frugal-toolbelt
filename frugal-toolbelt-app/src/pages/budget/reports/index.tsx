import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import { GET_LINE_ITEMS_BY_DATE } from "../../../graphql/queries";
// Components
import Spinner from "../../../components/common/spinner";
import SelectInput from "../../../components/common/forms/select-input";

interface Props {
  year: number;
}

const ReportsPage: React.FC<Props> = ({ year = new Date().getFullYear() }) => {
  const [selectedYear, setSelectedYear] = useState(year);
  const [availableYears, setAvailableYears] = useState([]);

  const { loading, data, refetch } = useQuery(GET_LINE_ITEMS_BY_DATE, {
    variables: { year: year },
  });

  useEffect(() => {
    // TODO: this is temporary, need to pull back all available budget years to user
    for (let i = selectedYear; i >= selectedYear - 10; i--) {
      setAvailableYears((prevYears) => [...prevYears, i]);
    }
  }, []);

  const handleChange = (event: React.FormEvent<any>): void => {
    const year = parseInt(event.currentTarget.value);
    setSelectedYear(year);
    refetch({ year });
  };

  return (
    <div className="container">
      <h1 className="title">Reports</h1>
      <ul>
        {!loading ? (
          <>
            <h2 className="title">
              {data.filterLineItemsByDate.length} Item
              {data.filterLineItemsByDate.length !== 1 ? "s" : ""} in {year}!
            </h2>

            <SelectInput
              name="years"
              label="years"
              value={`${selectedYear}`}
              options={availableYears.map((year) => ({
                value: year,
                text: year,
              }))}
              defaultOption={`Select Another Year`}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <Spinner />
          </>
        )}
      </ul>
    </div>
  );
};

export default ReportsPage;
