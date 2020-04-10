export default interface Category {
  _id?: string;
  name: string;
  icon: string;
  isActive?: boolean;
}

export const NewCategory: Category = {
  name: "",
  icon: "",
};
