import axios from "axios";
import ILineItem from "../interfaces/ILineItem";

const BUDGET_SERVICE_URI = "http://budget-service:8081";

export default class BudgetService {
  static async createLineItemAsync(lineItem: ILineItem) {
    const body = await axios
      .post(`${BUDGET_SERVICE_URI}/line-items`, lineItem)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        // tslint:disable-next-line:no-console
        console.error(`🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → ${error}`);
      });

    return body;
  }
}
