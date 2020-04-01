import { ICategory } from "./Category";
import mongoose, { Document, Schema } from "mongoose";

export interface ILineItem extends Document {
  title: string;
  description: string;
  isSavings: boolean;
  category: ICategory;
  amount: number;
  date: Date;
}

const setDecimalNumber = (val: number) => {
  return (val * 100).toFixed(2);
};

const getDecimalNumber = (val: number) => {
  return (val / 100).toFixed(2);
};

const LineItemSchema: Schema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Please provide a title for this line item"
    },
    description: { type: String, trim: true },
    isSavings: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    amount: {
      type: Number,
      default: 0,
      set: setDecimalNumber,
      get: getDecimalNumber
    },
    date: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now }
  },
  { toJSON: { getters: true }, toObject: { getters: true } }
);

export const lineItemSchema = new mongoose.Schema(
  {
    created: {
      type: Date,
      default: Date.now
    }
  },
  { toJSON: { getters: true }, toObject: { getters: true } }
);

// lineItemSchema.pre("save", function() {
//   const docToUpdate = this;

//   updateDateProperties(docToUpdate);
// });

// lineItemSchema.pre("findOneAndUpdate", async function() {
//   const docToUpdate = this._update;

//   updateDateProperties(docToUpdate);
// });

// const updateDateProperties = (docToUpdate: ) => {
//   const date = new Date(docToUpdate.date);

//   docToUpdate.year = parseInt(date.getFullYear());
//   docToUpdate.month = parseInt(
//     (1 + date.getMonth()).toString().padStart(2, "0")
//   );
//   docToUpdate.day = parseInt(
//     date
//       .getDate()
//       .toString()
//       .padStart(2, "0")
//   );
// };

export default mongoose.model<ILineItem>("LineItem", LineItemSchema);
