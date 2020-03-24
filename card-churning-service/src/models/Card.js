const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const cardSchema = new Schema({
  vendor: {
    type: String,
    enum: ["Visa", "American Express", "Master Card", "Discover"]
  },
  bank: String,
  name: {
    type: String,
    unique: true
  },
  applied: Date,
  approved: Date,
  // age of account: computed property
  bonusCategories: Array
});

//TODO: Add createdAt, updatedAt, deletedAt (allowNull)
//TODO: Set charset to UTF-8? Emoji support

module.exports = mongoose.model("Card", cardSchema);
