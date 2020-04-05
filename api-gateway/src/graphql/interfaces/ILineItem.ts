export default interface ILineItem {
  id: string;
  title: string;
  description: string;
  isSavings: boolean;
  //   category: ICategory;
  amount: number;
  date?: Date;
}
