const mockCreditCards = [
  {
    vendor: "Visa",
    bank: "Chase",
    name: "Sapphire Reserve",
    bonusCategories: ["Dining", "Travel"]
  },
  {
    vendor: "Discover",
    name: "It",
    bonusCategories: ["Grocery", "Walgreens", "CVS"]
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
    ]
  },
  {
    vendor: "Master Card",
    bank: "Citi",
    name: "Double Cash",
    bonusCategories: ["All"]
  }
];

db = db.getSiblingDB("card-churning");
db.cards.drop();
db.cards.insertMany(mockCreditCards);
