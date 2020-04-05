import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare
} from "@fortawesome/free-regular-svg-icons";

const BudgetPageFooter: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState(false);

  return (
    <div className="level">
      <div
        className={`dropdown ${activeDropdown ? "is-active" : ""}`}
        onClick={() => setActiveDropdown(!activeDropdown)}
      >
        <div className="dropdown-trigger">
          <button
            className="button is-primary is-light"
            aria-haspopup="true"
            aria-controls="add-budget-menu"
          >
            <span>Add New Entry</span>
            <span className="icon is-small">
              {activeDropdown ? (
                <FontAwesomeIcon icon={faMinusSquare} />
              ) : (
                <FontAwesomeIcon icon={faPlusSquare} />
              )}
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="add-budget-menu" role="menu">
          <div className="dropdown-content">
            <Link href={`/budget/line-item`}>
              <a className="has-text-danger dropdown-item">Expense</a>
            </Link>
            <Link href={`/budget/line-item`}>
              <a className="has-text-success dropdown-item">Savings</a>
            </Link>
          </div>
        </div>
      </div>
      <Link href="/budgets/reports">
        <a className="button is-success is-light">View Reports</a>
      </Link>
      <Link href="/categories">
        <a className="button is-link is-light">Manage Categories</a>
      </Link>
    </div>
  );
};

export default BudgetPageFooter;
