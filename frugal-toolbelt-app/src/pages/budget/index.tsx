import React from "react";
import { toast } from "react-toastify";
import { requireUser } from "../../lib/auth0-spa";
import { monthNames } from "../../lib/datetime-helpers";
import { useQuery, useMutation } from "react-apollo";
import { GET_LINE_ITEMS } from "../../graphql/queries";
// Components
import LineItemList from "../../components/budget/line-item-list";
import BudgetPageFooter from "../../components/budget/footer";
import { DELETE_LINE_ITEM } from "../../graphql/mutations";
// Interfaces
import LineItem from "../../interfaces/LineItem";

const Budget: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().getMonth() + 1
  );
  const [selectedYear] = React.useState(new Date().getFullYear());

  const { loading, data, refetch } = useQuery(GET_LINE_ITEMS);
  const [deleteLineItem] = useMutation(DELETE_LINE_ITEM);

  // React.useEffect(() => {
  //   loadLineItems({ month: selectedMonth, year: selectedYear }).catch(error => {
  //     console.log(`Loading budgets failed ${error}`);
  //   });
  //   loadCategories().catch(error => {
  //     console.log(`Loading categories failed ${error}`);
  //   });
  // }, [selectedMonth]);

  const handleDeleteLineItemAsync = async (lineItem: LineItem) => {
    try {
      await deleteLineItem({ variables: { id: lineItem._id } });
      toast.success("Budget Deleted");
      refetch();
    } catch (error) {
      toast.error(`Failed to delete line item. ${error}`);
    }
  };

  return (
    <div className="container">
      <h2 className="title">{selectedYear} Budgets</h2>
      <div className="tabs is-boxed is-centered">
        <ul>
          {monthNames.map((month, index) => (
            <li
              key={month}
              onClick={(): void => setSelectedMonth(index + 1)}
              className={selectedMonth == index + 1 ? "is-active" : ""}
            >
              <a>{month}</a>
            </li>
          ))}
        </ul>
      </div>
      {!loading ? (
        <>
          <LineItemList
            onDeleteClick={handleDeleteLineItemAsync}
            lineItems={data.lineItems}
          />
          <BudgetPageFooter />
        </>
      ) : (
        <></>
      )}
      {/* {loading ? (
          <Spinner />
        ) : lineItems.length ? (
          <>
            <LineItemsList
              onDeleteClick={handleDeleteBudgetAsync}
              lineItems={lineItems}
            />
  
            <BudgetsPageFooter />
          </>
        ) : (
          <NoBudgetNotification
            month={selectedMonth}
            year={selectedYear}
            categories={categories}
          />
        )} */}
    </div>
  );
};

export default requireUser(Budget);
