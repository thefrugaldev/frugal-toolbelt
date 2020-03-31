import mongoose, { Schema, Document } from "mongoose";
// mongoose.Promise = global.Promise;

export interface ICategory extends Document {
  name: string;
  created: Date;
  icon: string;
  isActive: boolean;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: "Please provide a name for this category" },
  created: { type: Date, default: Date.now },
  icon: String,
  isActive: { type: Boolean, default: true }
});

export default mongoose.model<ICategory>("Category", CategorySchema);

// export const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: "Please provide a name for this category"
//   },
//   created: {
//     type: Date,
//     default: Date.now
//   },
//   icon: String,
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// });