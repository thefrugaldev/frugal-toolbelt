const lineItems = [
  {
    title: "LGE",
    categoryId: 1
  },
  {
    title: "Louisville Water",
    categoryId: 2
  },
  {
    title: "Target",
    categoryId: 5
  },
  {
    title: "LGE",
    categoryId: 1
  },
  {
    title: "Movie Theatre",
    categoryId: 6
  },
  {
    title: "Red Lobster",
    categoryId: 6
  },
  {
    title: "LGE",
    categoryId: 1
  },
  {
    title: "Kroger",
    categoryId: 4
  },
  {
    title: "Louisville Water",
    categoryId: 2
  },
  {
    title: "LGE",
    categoryId: 1
  }
];

const categories = [
  {
    name: "Electricity"
  },
  {
    name: "Water"
  },
  {
    name: "Mortgage"
  },
  {
    name: "Grocery"
  },
  {
    name: "Shopping"
  },
  {
    name: "Entertainment"
  }
];

const newLineItem = {
  _id: null,
  title: "",
  amount: "",
  date: new Date().toDateString(),
  category: null,
  description: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
// module.exports = {
//   newLineItem,
//   lineItems,
//   categories
// };

db = db.getSiblingDB("budget");
db.lineitems.drop();
db.categories.drop();
db.lineitems.insertMany(lineItems);
db.categories.insertMany(categories);
