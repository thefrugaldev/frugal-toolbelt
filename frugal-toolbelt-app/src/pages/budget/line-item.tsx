import React, { useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-apollo";
import { GET_CATEGORIES } from "../../graphql/queries";
import { CREATE_LINE_ITEM } from "../../graphql/mutations";
import { useRouter } from "next/router";
// Components
import LineItemForm from "../../components/budget/line-item-form";
// Interfaces
import LineItem, { DefaultLineItem } from "../../interfaces/LineItem";

const LineItemPage: React.FC = () => {
  const [lineItem, setLineItem] = useState<LineItem>(DefaultLineItem);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [saveLineItem] = useMutation(CREATE_LINE_ITEM);

  const handleChange = (event: any) => {
    let { name, type, value } = event.target;

    switch (typeof lineItem[name]) {
      case "number":
        value = parseInt(value);
        break;
      case "boolean":
        value = value == "true";
      default:
        break;
    }

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
    saveLineItem({
      variables: {
        title: lineItem.title,
        description: lineItem.description,
        isSavings: lineItem.isSavings,
        amount: lineItem.amount
      }
    })
      .then(() => {
        toast.success("Budget Saved.");
        router.push("/budget");
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
