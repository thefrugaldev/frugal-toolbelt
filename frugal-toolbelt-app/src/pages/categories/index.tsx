import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useQuery, useMutation } from "react-apollo";
import { GET_CATEGORIES } from "../../graphql/queries";
import { CREATE_CATEGORY, DELETE_CATEGORY } from "../../graphql/mutations";
//Interfaces
import Category, { NewCategory } from "../../interfaces/Category";
import { toast } from "react-toastify";
import withRequireUser from "../../components/common/with-require-user";
import Spinner from "../../components/common/spinner";
import CategoriesPageFooter from "../../components/categories/footer";

const ManageCategoriesPage: React.FC = () => {
  const [category, setCategory] = useState<Category>(NewCategory);
  const [selectedIcon, setSelectedIcon] = useState<IconProp>();

  const { error, loading, data, refetch } = useQuery(GET_CATEGORIES);
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
    }).catch(() => toast.error(`Failed to save category`));
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

  if (loading) return <Spinner />;
  if (error)
    return (
      <h2 className="title is-2 has-text-centered">
        Error loading categories.
      </h2>
    );

  return (
    <>
      <h2 className="title has-text-centered">Your Current Categories</h2>
      {data.categories.length > 0 ? (
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
                          onClick={(): Promise<void> => handleDelete(category)}
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
      ) : (
        <h2 className="title is-2">
          Could not find any active categories. Please create a new one below.
        </h2>
      )}
      <CategoriesPageFooter
        category={category}
        selectedIcon={selectedIcon}
        onIconSelection={handleIconSelection}
        onInputChange={handleInputChange}
        onSave={handleSave}
      />
    </>
  );
};

export default withRequireUser(ManageCategoriesPage);
