export default interface LineItem {
  _id: string;
  title: string;
  description: string;
  isSavings: boolean;
  category: string;
  amount: number;
  date?: Date;
}
