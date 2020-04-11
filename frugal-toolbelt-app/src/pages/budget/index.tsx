import React from "react";
import { requireUser } from "../../lib/auth0-spa";
import { monthNames } from "../../lib/datetime-helpers";
import { useQuery } from "react-apollo";
import { GET_LINE_ITEMS } from "../../graphql/queries";
// Components
import LineItemList from "../../components/budget/line-item-list";
import BudgetPageFooter from "../../components/budget/footer";

const Budget: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().getMonth() + 1
  );
  const [selectedYear] = React.useState(new Date().getFullYear());

  const { loading, data } = useQuery(GET_LINE_ITEMS);

  // React.useEffect(() => {
  //   loadLineItems({ month: selectedMonth, year: selectedYear }).catch(error => {
  //     console.log(`Loading budgets failed ${error}`);
  //   });
  //   loadCategories().catch(error => {
  //     console.log(`Loading categories failed ${error}`);
  //   });
  // }, [selectedMonth]);

  // const handleDeleteBudgetAsync = async budget => {
  //   try {
  //     await deleteLineItem(budget);
  //     toast.success("Budget Deleted");
  //   } catch (error) {
  //     toast.error(`Delete Failed. ${error}`, { autoClose: false });
  //   }
  // };

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
            // onDeleteClick={handleDeleteBudgetAsync}
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
