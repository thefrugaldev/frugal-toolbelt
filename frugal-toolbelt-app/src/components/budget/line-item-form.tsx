import React, { useEffect } from "react";
// Components
import Input from "../common/forms/input";
import SelectInput from "../common/forms/select-input";
import TextArea from "../common/forms/text-area";
import DateInput from "../common/forms/date-input";
// Interfaces
import LineItem, { DefaultLineItem } from "../../interfaces/LineItem";
import Category from "../../interfaces/Category";

interface Props {
  lineItem: LineItem;
  categories: [Category];
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.FormEvent<any>) => void;
  saving: boolean;
  errors: any;
}

const LineItemForm: React.FC<Props> = ({
  lineItem,
  categories,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  // useEffect(() => {
  //   lineItems.find(lineItem => lineItem._id === id) || null;
  // })

  return (
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
            value={lineItem.category ? lineItem.category._id : ""}
            defaultOption="Select Category"
            options={categories.map(cat => ({
              value: cat._id,
              text: cat.name
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
                text: `Expense`
              },
              {
                value: true.toString(),
                text: `Savings`
              }
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
  );
};

export default LineItemForm;
