export default interface ILineItem {
  title: string;
  description: string;
  isSavings: boolean;
  //   category: ICategory;
  amount: number;
  date?: Date;
}
