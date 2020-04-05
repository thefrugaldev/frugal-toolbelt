export default interface LineItem {
  _id: string;
  title: string;
  description: string;
  isSavings: boolean;
  amount: number;
  categoryId: string;
}
