import Category from "./Category";

export default interface LineItem {
  _id: string;
  title: string;
  description: string;
  isSavings: boolean;
  amount: number;
  date: string;
  category: Category;
}

export const DefaultLineItem: LineItem = {
  _id: null,
  title: "",
  description: "",
  isSavings: false,
  amount: 0,
  date: new Date().toDateString(),
  category: null
};
