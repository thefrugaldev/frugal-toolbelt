import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useQuery, useMutation } from "react-apollo";
import { GET_CATEGORIES } from "../../graphql/queries";
import { CREATE_CATEGORY, DELETE_CATEGORY } from "../../graphql/mutations";
// Components
import Input from "../../components/common/forms/input";
import IconPicker from "../../components/common/icon-picker";
//Interfaces
import Category, { NewCategory } from "../../interfaces/Category";
import { toast } from "react-toastify";

const ManageCategoriesPage: React.FC = () => {
  const [category, setCategory] = useState<Category>(NewCategory);
  const [selectedIcon, setSelectedIcon] = useState<IconProp>();

  const { loading, data, refetch } = useQuery(GET_CATEGORIES);
  const [saveCategory] = useMutation(CREATE_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

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
    saveCategory({
      variables: { category },
    }).catch((error) => console.error(`Failed to save category: `, error));
    refetch();
    setSelectedIcon(null);
    setCategory(NewCategory);
  };

  const handleDelete = async (category: Category): Promise<void> => {
    try {
      await deleteCategory({ variables: { id: category._id } });
      toast.success("Category deleted");
      refetch();
    } catch (error) {
      toast.error(`Failed to delete category: ${error}`);
    }
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
                              <FontAwesomeIcon icon={category.icon} />
                            </span>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>{category.name}</td>
                        <td>
                          <button
                            onClick={(): Promise<void> =>
                              handleDelete(category)
                            }
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
