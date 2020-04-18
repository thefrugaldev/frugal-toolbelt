import { Category } from "./Category";
import mongoose, { Document, Schema } from "mongoose";

export interface LineItem {
  title: string;
  description: string;
  isSavings: boolean;
  category?: Category;
  amount: number;
  date: Date;
}

export interface LineItemDocument extends Document, LineItem {}

const setDecimalNumber = (val: number) => {
  return val.toFixed(2);
};

const LineItemSchema: Schema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Please provide a title for this line item",
    },
    description: { type: String, trim: true },
    isSavings: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    amount: {
      type: Number,
      default: 0,
      set: setDecimalNumber,
    },
    date: { type: Date, default: Date.now, required: true },
    created: { type: Date, default: Date.now },
  },
  { toJSON: { getters: true }, toObject: { getters: true } }
);

export const lineItemSchema = new mongoose.Schema(
  {
    created: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { getters: true }, toObject: { getters: true } }
);

export default mongoose.model<LineItemDocument>("LineItem", LineItemSchema);
