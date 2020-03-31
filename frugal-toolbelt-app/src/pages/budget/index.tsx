import React from "react";
import { requireUser } from "../../lib/auth0-spa";
import { monthNames } from "../../lib/datetime-helpers";

interface Props {}

const Budget: React.FC<Props> = () => {
  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear()
  );

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
              onClick={() => setSelectedMonth(index + 1)}
              className={selectedMonth == index + 1 ? "is-active" : ""}
            >
              <a>{month}</a>
            </li>
          ))}
        </ul>
      </div>
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
