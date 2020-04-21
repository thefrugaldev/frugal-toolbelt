import React from "react";
import Link from "next/link";

const BudgetPageFooter: React.FC = () => {
  return (
    <div className="level">
      <Link href="/budget/line-item">
        <a className="button is-primary is-light">Add New Entry</a>
      </Link>
      <Link href="/budget/reports">
        <a className="button is-success is-light">View Reports</a>
      </Link>
      <Link href="/categories">
        <a className="button is-link is-light">Manage Categories</a>
      </Link>
    </div>
  );
};

export default BudgetPageFooter;
