export default interface LineItem {
  id: string;
  title: string;
  description: string;
  isSavings: boolean;
  //   category: ICategory;
  amount: number;
  date?: Date;
}
