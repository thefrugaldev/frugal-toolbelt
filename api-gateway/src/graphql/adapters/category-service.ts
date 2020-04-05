import axios from "axios";
import ICategory from "../interfaces/ICategory";

const BUDGET_SERVICE_URI = "http://budget-service:8081";

export default class CategoryService {
  static async fetchCategoriesAsync() {
    const body = await axios
      .get(`${BUDGET_SERVICE_URI}/categories`)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        // tslint:disable-next-line:no-console
        console.error(
          `🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → Error fetching categories: ${error}`
        );
      });

    return body;
  }

  static async fetchCategoryByIdAsync(id: string) {
    const body = await axios
      .get(`${BUDGET_SERVICE_URI}/categories/${id}`)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        // tslint:disable-next-line:no-console
        console.error(
          `🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → Error fetching category ${id}: ${error}`
        );
      });

    return body;
  }

  static async createCategoryAsync(category: ICategory) {
    const body = await axios
      .post(`${BUDGET_SERVICE_URI}/categories`, category)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        // tslint:disable-next-line:no-console
        console.error(
          `🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → Error creating category: ${error}`
        );
      });

    return body;
  }
}
