import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Category from "../../interfaces/Category";
import Input from "../common/forms/input";
import IconPicker from "../common/icon-picker";

interface CategoriesPageFooterProps {
  onIconSelection: (icon: IconProp) => void;
  onInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selectedIcon: IconProp;
  category: Category;
}

const CategoriesPageFooter: React.FC<CategoriesPageFooterProps> = ({
  onIconSelection,
  onInputChange,
  onSave,
  selectedIcon,
  category,
}) => {
  return (
    <div className="field is-grouped columns is-centered m-t-lg">
      <div className="control">
        <IconPicker onIconSelection={onIconSelection} />
        {selectedIcon && (
          <span className="icon has-text-info is-large">
            <FontAwesomeIcon icon={selectedIcon} size="2x" />
          </span>
        )}
      </div>
      <div className="control">
        <Input
          type="text"
          name="category"
          placeholder={"Category Name"}
          onChange={onInputChange}
          value={category?.name}
        />
      </div>
      <div className="control">
        <button onClick={onSave} className="button is-success">
          Save
        </button>
      </div>
    </div>
  );
};

export default CategoriesPageFooter;
