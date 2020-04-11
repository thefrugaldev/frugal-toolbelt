import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import LineItem from "../../interfaces/LineItem";
import { getDisplayFormattedDate } from "../../lib/datetime-helpers";
// Utils
// import { getDisplayFormattedDate } from "../../utils/datetime-helpers";

interface Props {
  lineItems: Array<LineItem>;
  onDeleteClick?: Function;
}

const LineItemList: React.FC<Props> = ({ lineItems }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalBody, setModalBody] = useState();
  // const [sortedProperty, setSortedProperty] = useState("");

  const handleInfoClick = (budget): void => {
    setModalTitle(budget.title);
    setModalBody(budget.description);
    setActiveModal(true);
  };

  //   const sortByType = key => {
  //     key === sortedProperty ? sortDescending(key) : sortAscending(key);
  //   };

  //   const sortAscending = key => {
  //     dispatch(sortLineItems(key));
  //     setSortedProperty(key);
  //   };

  //   const sortDescending = key => {
  //     dispatch(sortLineItems(key, "desc"));
  //     setSortedProperty("");
  //   };

  return (
    <>
      <div className={`modal ${activeModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{modalTitle}</p>
            <button
              className="delete"
              onClick={(): void => setActiveModal(false)}
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">{modalBody}</section>
        </div>
      </div>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            {/* <th onClick={() => sortByType("title")}>Title</th> */}
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            {/* <th onClick={() => sortByType("amount")}>Amount</th>
            <th onClick={() => sortByType("date")}>Date</th> */}
            <th>Notes</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {lineItems.map((lineItem: LineItem) => {
            return (
              <tr key={lineItem._id}>
                <td>
                  <Link href={`/budget/line-item/${lineItem._id}`}>
                    <a>{lineItem.title}</a>
                  </Link>
                </td>
                <td>
                  {lineItem.category
                    ? lineItem.category.name
                    : "No Category Specified"}
                </td>
                <td
                  className={
                    lineItem.isSavings ? `has-text-success` : `has-text-danger`
                  }
                >
                  {lineItem.amount && `$${lineItem.amount}`}
                </td>
                <td>{getDisplayFormattedDate(lineItem.date)}</td>
                <td>
                  {lineItem.description && (
                    <span className="icon has-text-info">
                      <FontAwesomeIcon
                        onClick={(): void => handleInfoClick(lineItem)}
                        icon={faInfoCircle}
                      />
                    </span>
                  )}
                </td>
                <td>
                  <button
                    className="button is-danger"
                    // onClick={() => onDeleteClick(lineItem)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default LineItemList;
