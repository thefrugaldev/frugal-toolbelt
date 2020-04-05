const getPreviousDate = (month = 0, year = 0) => {
  const date = new Date();

  if (month > 0) {
    date.setMonth(date.getMonth() - month);
  }

  if (year > 0) {
    date.setFullYear(date.getFullYear() - year);
  }

  return date;
};

const categories = [
  {
    name: "Electricity",
    created: new Date(),
    icon: "bolt",
    isActive: true,
    _id: ObjectId()
  },
  {
    name: "Water",
    created: new Date(),
    icon: "bolt",
    isActive: true,
    _id: ObjectId()
  },
  {
    name: "Mortgage",
    created: new Date(),
    icon: "home",
    isActive: true,
    _id: ObjectId()
  },
  {
    name: "Grocery",
    created: new Date(),
    icon: "utensils",
    isActive: true,
    _id: ObjectId()
  },
  {
    name: "Shopping",
    created: new Date(),
    icon: "shopping-cart",
    isActive: true,
    _id: ObjectId()
  },
  {
    name: "Entertainment",
    created: new Date(),
    icon: "glass-cheers",
    isActive: true,
    _id: ObjectId()
  }
];

const getCategoryIdByName = categoryName => {
  print(categoryName);

  const category = categories.find(cat => cat.name === categoryName);

  return category ? category._id : null;
};

const lineItems = [
  {
    title: "LGE",
    description: "LGE Bill",
    isSavings: false,
    amount: 130,
    date: new Date(),
    category: getCategoryIdByName("Electricity")
  },
  {
    title: "Louisville Water",
    description: "Water Bill",
    isSavings: false,
    amount: 150,
    date: getPreviousDate(1),
    category: getCategoryIdByName("Water")
  },
  {
    title: "Target",
    description: "New Shoes",
    isSavings: false,
    amount: 85,
    date: new Date(),
    category: getCategoryIdByName("Shopping")
  },
  {
    title: "LGE",
    description: "LGE Bill",
    isSavings: false,
    amount: 130,
    date: getPreviousDate(1),
    category: getCategoryIdByName("Electricity")
  },
  {
    title: "Movie Theatre",
    description: "",
    isSavings: false,
    amount: 15,
    date: new Date(),
    category: getCategoryIdByName("Entertainment")
  },
  {
    title: "Red Lobster",
    description: "",
    isSavings: false,
    amount: 75,
    date: new Date(),
    category: getCategoryIdByName("Eating Out")
  },
  {
    title: "LGE",
    description: "LGE Bill",
    isSavings: false,
    amount: 130,
    date: getPreviousDate(2),
    category: getCategoryIdByName("Electricity")
  },
  {
    title: "Kroger",
    description: "",
    isSavings: false,
    amount: 115,
    date: new Date(),
    category: getCategoryIdByName("Grocery")
  },
  {
    title: "Louisville Water",
    description: "Water Bill",
    isSavings: false,
    amount: 150,
    date: getPreviousDate(3),
    category: getCategoryIdByName("Water")
  },
  {
    title: "LGE",
    description: "LGE Bill",
    isSavings: false,
    amount: 130,
    date: getPreviousDate(3),
    category: getCategoryIdByName("Electricity")
  }
];

// tslint:disable-next-line:no-console
print(`🌷 💧 🌷 💧 🌷 💧 🌷 💧 Seeding budget service database`);

db = db.getSiblingDB("budget");
db.lineitems.drop();
db.categories.drop();
db.lineitems.insertMany(lineItems);
db.categories.insertMany(categories);
