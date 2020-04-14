import axios from "axios";
import LineItem from "../interfaces/LineItem";

const BUDGET_SERVICE_URI = "http://budget-service:8081";

export default class LineItemService {
  static async fetchLineItemsAsync() {
    const body = await axios
      .get(`${BUDGET_SERVICE_URI}/line-items`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        // tslint:disable-next-line:no-console
        console.error(
          `🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → Error fetching line items: ${error}`
        );
      });

    return body;
  }

  static async fetchLineItemByIdAsync(id: string) {
    const body = await axios
      .get(`${BUDGET_SERVICE_URI}/line-items/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        // tslint:disable-next-line:no-console
        console.error(
          `🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → Error fetching line item ${id}: ${error}`
        );
      });

    return body;
  }

  static async createLineItemAsync(lineItem: LineItem) {
    const body = await axios
      .post(`${BUDGET_SERVICE_URI}/line-items`, lineItem)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        // tslint:disable-next-line:no-console
        console.error(
          `🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → Error creating line item: ${error}`
        );
      });

    return body;
  }

  static async deleteLineItemAsync(id: string): Promise<number | void> {
    const status = await axios
      .delete(`${BUDGET_SERVICE_URI}/line-items/${id}`)
      .then((res) => {
        return res.status;
      })
      .catch((error) => {
        // tslint:disable-next-line:no-console
        console.error(
          `🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → Error deleting line item ${id}: ${error}`
        );
      });

    return status;
  }
}
