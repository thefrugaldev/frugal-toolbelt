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
