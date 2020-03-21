const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const creditCardSchema = new Schema({
  vendor: {
    type: String,
    enum: ["Visa", "American Express", "Master Card", "Discover"]
  },
  bank: String,
  name: String,
  applied: Date,
  approved: Date,
  // age of account: computed property
  bonusCategories: Array
});

module.exports = mongoose.model("CreditCard", creditCardSchema);
