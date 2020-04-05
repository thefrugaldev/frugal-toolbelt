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

const lineItems = [
  {
    title: "LGE",
    description: "LGE Bill",
    isSavings: false,
    amount: 130,
    date: new Date()
  },
  {
    title: "Louisville Water",
    description: "Water Bill",
    isSavings: false,
    amount: 150,
    date: getPreviousDate(1)
  },
  {
    title: "Target",
    description: "New Shoes",
    isSavings: false,
    amount: 85,
    date: new Date()
  },
  {
    title: "LGE",
    description: "LGE Bill",
    isSavings: false,
    amount: 130,
    date: getPreviousDate(1)
  },
  {
    title: "Movie Theatre",
    description: "",
    isSavings: false,
    amount: 15,
    date: new Date()
  },
  {
    title: "Red Lobster",
    description: "",
    isSavings: false,
    amount: 75,
    date: new Date()
  },
  {
    title: "LGE",
    description: "LGE Bill",
    isSavings: false,
    amount: 130,
    date: getPreviousDate(2)
  },
  {
    title: "Kroger",
    description: "",
    isSavings: false,
    amount: 115,
    date: new Date()
  },
  {
    title: "Louisville Water",
    description: "Water Bill",
    isSavings: false,
    amount: 150,
    date: getPreviousDate(3)
  },
  {
    title: "LGE",
    description: "LGE Bill",
    isSavings: false,
    amount: 130,
    date: getPreviousDate(3)
  }
];

const categories = [
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

// tslint:disable-next-line:no-console
print(`🌷 💧 🌷 💧 🌷 💧 🌷 💧 Seeding budget service database`);

db = db.getSiblingDB("budget");
db.lineitems.drop();
db.categories.drop();
db.lineitems.insertMany(lineItems);
db.categories.insertMany(categories);
