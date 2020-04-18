import React, { useState, useEffect } from "react";
// Components
import Input from "../common/forms/input";
import SelectInput from "../common/forms/select-input";
import TextArea from "../common/forms/text-area";
import DateInput from "../common/forms/date-input";
import { useQuery } from "react-apollo";
import { GET_CATEGORIES } from "../../graphql/queries";
// Interfaces
import LineItem from "../../interfaces/LineItem";

interface Props {
  lineItem: LineItem;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.FormEvent<any>) => void;
  saving: boolean;
  errors: any;
}

const LineItemForm: React.FC<Props> = ({
  lineItem,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  const { loading, data } = useQuery(GET_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (!loading && lineItem.category) {
      setSelectedCategory(
        data.categories.find((cat) => cat._id === lineItem.category)?._id
      );
    }
  }, [loading, lineItem]);

  return (
    !loading && (
      <form onSubmit={onSave}>
        <h2 className="title">{lineItem._id ? "Edit" : "Add"} Budget</h2>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <Input
          name="title"
          type="text"
          label="Title"
          value={lineItem.title}
          onChange={onChange}
          error={errors.title}
        />
        <Input
          name="amount"
          type="number"
          label="Amount"
          value={lineItem.amount.toString()}
          onChange={onChange}
          error={errors.amount}
        />
        <DateInput
          name="date"
          label="Date"
          value={lineItem.date}
          onChange={onChange}
          error={errors.date}
        />
        <div className="field level">
          <div className="field-body">
            <SelectInput
              name="category"
              label="Category"
              value={selectedCategory}
              defaultOption="Select Category"
              options={data.categories.map((cat) => ({
                value: cat._id,
                text: cat.name,
              }))}
              onChange={onChange}
              error={errors.category}
            />
            <SelectInput
              name="isSavings"
              label="Type"
              value={lineItem.isSavings.toString()}
              defaultOption="Select Entry Type"
              options={[
                {
                  value: false.toString(),
                  text: `Expense`,
                },
                {
                  value: true.toString(),
                  text: `Savings`,
                },
              ]}
              onChange={onChange}
              error={errors.type}
            />
          </div>
        </div>
        <TextArea
          name="description"
          label="Description"
          value={lineItem.description}
          onChange={onChange}
          error={errors.description}
        />
        <div className="control">
          <button type="submit" disabled={saving} className="button is-primary">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    )
  );
};

export default LineItemForm;
