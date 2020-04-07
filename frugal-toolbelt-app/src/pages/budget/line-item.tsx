import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-apollo";
import { GET_CATEGORIES } from "../../graphql/queries";
// Components
import LineItemForm from "../../components/budget/line-item-form";
// Interfaces
import { DefaultLineItem } from "../../interfaces/LineItem";

interface Props {
  saveLineItem: Function;
}

const LineItemPage: React.FC<Props> = ({ saveLineItem }) => {
  const [lineItem, setLineItem] = useState(DefaultLineItem);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  // useEffect(() => {
  //   if (lineItems.length === 0) {
  //     loadLineItems().catch(error => {
  //       alert(`Loading line items failed ${error}`);
  //     });
  //   } else {
  //     setLineItem({ ...props.lineItem });
  //   }
  //   loadCategories().catch(error => {
  //     alert(`Loading categories failed ${error}`);
  //   });
  // }, [props.lineItem]);

  const handleChange = event => {
    const { name, value } = event.target;

    // tslint:disable-next-line:no-console
    console.log(`Changing ${name} to ${value}`);
    setLineItem(prevLineItem => ({
      ...prevLineItem,
      [name]: value
    }));
  };

  const formIsValid = () => {
    const { title, amount, date, category, isSavings } = lineItem;
    const errors: any = {};

    if (!title) errors.title = "Title is required";
    if (!amount) errors.amount = "Amount is required";
    if (!date) errors.date = "Please select a date";
    if (!category) errors.category = "Please select a category";
    if (!isSavings) errors.type = "Please choose an entry type";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  const handleSave = event => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveLineItem(lineItem)
      .then(() => {
        toast.success("Budget Saved.");
        // history.push("/budget");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  return loading ? (
    <></>
  ) : (
    <div className="container">
      <LineItemForm
        lineItem={lineItem}
        errors={errors}
        categories={data.categories}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
};

// export function getLineItemById(lineItems, id) {
//   return lineItems.find(lineItem => lineItem._id === id) || null;
// }

export default LineItemPage;
