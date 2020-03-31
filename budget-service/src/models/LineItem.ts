import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const setDecimalNumber = (val: number) => {
  return (val * 100).toFixed(2);
};

const getDecimalNumber = (val: number) => {
  return (val / 100).toFixed(2);
};

export const lineItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Please provide a title for this budget"
    },
    description: {
      type: String,
      trim: true
    },
    isSavings: {
      type: Boolean,
      default: false
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    amount: {
      type: Number,
      default: 0,
      set: setDecimalNumber,
      get: getDecimalNumber
    },
    date: {
      type: Date,
      default: Date.now
    },
    month: {
      type: Number,
      default: new Date().getMonth() + 1
    },
    year: {
      type: Number,
      default: new Date().getFullYear()
    },
    day: {
      type: Number,
      default: new Date().getDate()
    },
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
