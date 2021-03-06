const getPreviousDate = (day = 0, month = 0, year = 0) => {
  const date = new Date();

  if (day > 0) {
    date.setDate(date.getDate() - day);
  }

  if (month > 0) {
    date.setMonth(date.getMonth() - month);
  }

  if (year > 0) {
    date.setFullYear(date.getFullYear() - year);
  }

  return date;
};

const mockCreditCards = [
  {
    vendor: "Visa",
    bank: "Chase",
    name: "Sapphire Reserve",
    bonusCategories: ["Dining", "Travel"],
    applied: getPreviousDate(2),
    approved: new Date()
  },
  {
    vendor: "Discover",
    name: "It",
    bonusCategories: ["Grocery", "Walgreens", "CVS"],
    applied: getPreviousDate(0, 2),
    approved: getPreviousDate(2, 2)
  },
  {
    vendor: "Visa",
    bank: "Chase",
    name: "Business Ink",
    bonusCategories: [
      "Gas Stations",
      "Internet",
      "Cell Phone",
      "Office Supplies"
    ],
    applied: getPreviousDate(0, 5),
    approved: getPreviousDate(2, 5)
  },
  {
    vendor: "Master Card",
    bank: "Citi",
    name: "Double Cash",
    bonusCategories: ["All"],
    applied: getPreviousDate(0, 0, 1),
    approved: getPreviousDate(2, 0, 1)
  }
];

// tslint:disable-next-line:no-console
print(`🌷 💧 🌷 💧 🌷 💧 🌷 💧 Seeding card-churning service database`);

db = db.getSiblingDB("card-churning");
db.cards.drop();
db.cards.insertMany(mockCreditCards);
