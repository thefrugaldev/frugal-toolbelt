import Category from "./Category";

export default interface LineItem {
  _id: string;
  title: string;
  description: string;
  isSavings: boolean;
  amount: number;
  date: Date;
  category: Category;
}

export const NewLineItem: LineItem = {
  _id: null,
  title: "",
  description: "",
  isSavings: false,
  amount: 0,
  date: new Date(),
  category: null,
};
