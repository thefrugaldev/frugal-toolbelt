import mongoose, { Schema, Document } from "mongoose";

interface ICardSchema extends Document {
  vendor: string;
  bank: string;
  name: string;
  applied: Date;
  approved: Date;
  bonusCategories: string[];
}

const cardSchema: Schema = new Schema({
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

// TODO: Add createdAt, updatedAt, deletedAt (allowNull)
// TODO: Set charset to UTF-8? Emoji support

export default mongoose.model<ICardSchema>("Card", cardSchema);
