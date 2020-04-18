import Category from "../models/Category";
import LineItem from "../models/LineItem";

export const fetchLineItems = async (query: string) => {
  try {
    const lineItems = await LineItem.aggregate()
      .addFields({ month: { $month: "$date" }, year: { $year: "$date" } })
      .match(query);

    await Category.populate(lineItems, { path: "category" });

    return lineItems;
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e);
  }
};
