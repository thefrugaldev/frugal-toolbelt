import BudgetService from "../../../adapters/budget-service";
import ILineItem from "../../../interfaces/ILineItem";

const createLineItemResolver = async (obj: any, lineItem: ILineItem) => {
  return await BudgetService.createLineItemAsync(lineItem);
};

export default createLineItemResolver;
