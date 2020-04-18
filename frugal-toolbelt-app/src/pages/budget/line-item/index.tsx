import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-apollo";
import { GET_CATEGORIES, GET_LINE_ITEM } from "../../../graphql/queries";
import { CREATE_LINE_ITEM } from "../../../graphql/mutations";
import { useRouter } from "next/router";
// Components
import LineItemForm from "../../../components/budget/line-item-form";
// Interfaces
import LineItem, { NewLineItem } from "../../../interfaces/LineItem";

const LineItemPage: React.FC<{ id: string }> = ({ id }) => {
  const [lineItem, setLineItem] = useState<LineItem>(NewLineItem);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const lineItemQuery: { loading; data } = useQuery(GET_LINE_ITEM, {
    variables: {
      id,
    },
  });
  const categoriesQuery: { loading; data } = useQuery(GET_CATEGORIES);
  const [saveLineItem] = useMutation(CREATE_LINE_ITEM);

  useEffect(() => {
    if (!lineItemQuery.loading && lineItemQuery.data)
      setLineItem(lineItemQuery.data.lineItem);
  }, [lineItemQuery.loading]);

  const handleChange = (event: React.FormEvent<any>): void => {
    let { value } = event.currentTarget;
    const { name } = event.currentTarget;

    switch (typeof lineItem[name]) {
      case "number":
        value = parseInt(value);
        break;
      case "boolean":
        value = value == "true";
        break;
      default:
        break;
    }

    setLineItem((prevLineItem) => ({
      ...prevLineItem,
      [name]: value,
    }));
  };

  const formIsValid = (): boolean => {
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

  const handleSave = (event): void => {
    event.preventDefault();

    if (!formIsValid()) return;

    setSaving(true);
    saveLineItem({
      variables: {
        lineItem,
      },
    })
      .then(() => {
        toast.success("Budget Saved.");
        router.push("/budget");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  return categoriesQuery.loading ? (
    <></>
  ) : (
    <div className="container">
      <LineItemForm
        lineItem={lineItem}
        errors={errors}
        categories={categoriesQuery.data.categories}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
};

export default LineItemPage;