import { Category } from "./../models/Category";
import { LineItem } from "../models/LineItem";

/*
///////////////////////////////
USED AS REFERENCE FOR TYPECHECKING ONLY
ACTUAL SEED DATA LIVES IN seed-mock-db.js FILE
///////////////////////////////
*/

const getPreviousDate = (month: number = 0, year: number = 0) => {
  const date = new Date();

  if (month > 0) {
    date.setMonth(date.getMonth() - month);
  }

  if (year > 0) {
    date.setFullYear(date.getFullYear() - year);
  }

  return date;
};

const lineItems: LineItem[] = [
  {
    title: "LGE",
    description: "LGE Bill",
    isSavings: false,
    amount: 13000,
    date: new Date()
  },
  {
    title: "Louisville Water",
    description: "Water Bill",
    isSavings: false,
    amount: 15000,
    date: getPreviousDate(1)
  },
  {
    title: "Target",
    description: "New Shoes",
    isSavings: false,
    amount: 8500,
    date: new Date()
  },
  {
    title: "LGE",
    description: "LGE Bill",
    isSavings: false,
    amount: 13000,
    date: getPreviousDate(1)
  },
  {
    title: "Movie Theatre",
    description: "",
    isSavings: false,
    amount: 1500,
    date: new Date()
  },
  {
    title: "Red Lobster",
    description: "",
    isSavings: false,
    amount: 7500,
    date: new Date()
  },
  {
    title: "LGE",
    description: "LGE Bill",
    isSavings: false,
    amount: 13000,
    date: getPreviousDate(2)
  },
  {
    title: "Kroger",
    description: "",
    isSavings: false,
    amount: 11500,
    date: new Date()
  },
  {
    title: "Louisville Water",
    description: "Water Bill",
    isSavings: false,
    amount: 15000,
    date: getPreviousDate(3)
  },
  {
    title: "LGE",
    description: "LGE Bill",
    isSavings: false,
    amount: 13000,
    date: getPreviousDate(3)
  }
];

const categories: Category[] = [
  {
    name: "Electricity",
    created: new Date(),
    icon: "bolt",
    isActive: true
  },
  {
    name: "Water",
    created: new Date(),
    icon: "bolt",
    isActive: true
  },
  {
    name: "Mortgage",
    created: new Date(),
    icon: "home",
    isActive: true
  },
  {
    name: "Grocery",
    created: new Date(),
    icon: "utensils",
    isActive: true
  },
  {
    name: "Shopping",
    created: new Date(),
    icon: "shopping-cart",
    isActive: true
  },
  {
    name: "Entertainment",
    created: new Date(),
    icon: "glass-cheers",
    isActive: true
  }
];
