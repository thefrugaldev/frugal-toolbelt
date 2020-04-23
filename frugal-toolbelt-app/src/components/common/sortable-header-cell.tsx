import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

interface Props {
  title: string;
  sortKey: string;
  onSort: (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
    sortKey: string
  ) => void;
}

const SortableHeaderCell: React.FC<Props> = ({ title, sortKey, onSort }) => {
  return (
    <th
      onClick={(e): void => {
        onSort(e, sortKey);
      }}
    >
      {title}
      <span className={`icon is-pulled-right`}>
        <FontAwesomeIcon icon={faSort} />
      </span>
      <style jsx>{`
        th {
          cursor: pointer;
        }
      `}</style>
    </th>
  );
};

export default SortableHeaderCell;
