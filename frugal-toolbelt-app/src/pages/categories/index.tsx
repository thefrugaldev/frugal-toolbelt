import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useQuery, useMutation } from "react-apollo";
import { GET_CATEGORIES } from "../../graphql/queries";
import { CREATE_CATEGORY } from "../../graphql/mutations";
// Components
import Input from "../../components/common/forms/input";
import IconPicker from "../../components/common/icon-picker";
//Interfaces
import Category, { NewCategory } from "../../interfaces/Category";

interface Props {
  deleteCategory: any;
}

const ManageCategoriesPage: React.FC<Props> = ({ deleteCategory }) => {
  const [category, setCategory] = useState<Category>(NewCategory);
  const [selectedIcon, setSelectedIcon] = useState<IconProp>();

  const { loading, data } = useQuery(GET_CATEGORIES);
  const [saveCategory] = useMutation(CREATE_CATEGORY);

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    //TODO: Dig into why rendering is so laggy

    const { value } = event.currentTarget;

    setCategory((category) => ({
      ...category,
      name: value,
    }));
  };

  const handleIconSelection = (icon: IconProp): void => {
    setSelectedIcon(icon);
    setCategory(
      (category): Category => ({ ...category, icon: icon.toString() })
    );
  };

  const handleSave = (): void => {
    // const category = { name: category, icon: selectedIcon };

    console.log(category);

    saveCategory({
      variables: { category },
    }).catch((error) => console.error(`Failed to save category: `, error));
    setSelectedIcon(null);
    // setCategory("");
  };

  const handleDelete = (category): void => {
    deleteCategory(category).catch((error) =>
      console.error(`Failed to delete category: `, error)
    );
  };

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : data.categories.length === 0 ? (
        <h2 className="title">No Categories. Create One Below</h2>
      ) : (
        <>
          <h2 className="title has-text-centered">Your Current Categories</h2>
          <div className="columns is-centered">
            <div className="column is-narrow">
              <table className="table">
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Category Name</th>
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {data.categories.map((category) => {
                    return (
                      <tr key={category._id}>
                        <td>
                          {category.icon ? (
                            <span className="icon has-text-info is-large">
                              {/* <FontAwesomeIcon icon={category.icon} /> */}
                            </span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>{category.name}</td>
                        <td>
                          <button
                            onClick={(): void => handleDelete(category)}
                            className="button is-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <div className="field is-grouped columns is-centered m-t-lg">
        <div className="control">
          <IconPicker onIconSelection={handleIconSelection} />
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
            onChange={handleInputChange}
            value={category?.name}
          />
        </div>
        <div className="control">
          <button onClick={handleSave} className="button is-success">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageCategoriesPage;
