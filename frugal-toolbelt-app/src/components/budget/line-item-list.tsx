import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import LineItem from "../../interfaces/LineItem";
import { getDisplayFormattedDate } from "../../lib/datetime-helpers";
import useSort from "../../hooks/use-sort";

interface LineItemList {
  lineItems: Array<LineItem>;
  onDeleteClick?: Function;
}

interface SortableHeaderCellProps {
  title: string;
  isAscending: boolean;
  sortKey: string;
  onSort: (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
    sortKey: string
  ) => void;
}

const SortableHeaderCell: React.FC<SortableHeaderCellProps> = ({
  title,
  isAscending,
  sortKey,
  onSort,
}) => {
  return (
    <th onClick={(e): void => onSort(e, sortKey)}>
      {title}
      <span className={`icon is-pulled-right ${"is-sorted"}`}>
        {isAscending ? (
          <FontAwesomeIcon icon={faSortUp} />
        ) : (
          <FontAwesomeIcon icon={faSortDown} />
        )}
      </span>
    </th>
  );
};

const LineItemList: React.FC<LineItemList> = ({ lineItems, onDeleteClick }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalBody, setModalBody] = useState();
  const { sortedData, ...sortControls } = useSort(lineItems, "category.name");

  const handleSorting = (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
    sortKey: string
  ): void => {
    console.log(e.currentTarget);
    sortControls.setSortKey(sortKey);
    sortControls.toggleAscending();
  };

  const handleInfoClick = (budget): void => {
    setModalTitle(budget.title);
    setModalBody(budget.description);
    setActiveModal(true);
  };

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
      <table className="table is-fullwidth is-bordered">
        <thead>
          <tr>
            <SortableHeaderCell
              title="Title"
              sortKey="title"
              onSort={handleSorting}
              isAscending={sortControls.isAscending}
            />
            <SortableHeaderCell
              title="Category"
              sortKey="category.name"
              onSort={handleSorting}
              isAscending={sortControls.isAscending}
            />
            <SortableHeaderCell
              title="Amount"
              sortKey="amount"
              onSort={handleSorting}
              isAscending={sortControls.isAscending}
            />
            <SortableHeaderCell
              title="Date"
              sortKey="date"
              onSort={handleSorting}
              isAscending={sortControls.isAscending}
            />
            <th>Notes</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {sortedData.map((lineItem: LineItem) => {
            return (
              <tr key={lineItem._id}>
                <td>
                  <Link
                    href="/budget/line-item/[id]"
                    as={`/budget/line-item/${lineItem._id}`}
                  >
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
                    <a className="icon has-text-info">
                      <FontAwesomeIcon
                        onClick={(): void => handleInfoClick(lineItem)}
                        icon={faInfoCircle}
                      />
                    </a>
                  )}
                </td>
                <td>
                  <button
                    className="button is-danger"
                    onClick={(): void => onDeleteClick(lineItem)}
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
