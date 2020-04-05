import mongoose, { Schema, Document } from "mongoose";

export interface Category {
  name: string;
  created: Date;
  icon: string;
  isActive: boolean;
}

interface CategoryDocument extends Document, Category {}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: "Please provide a name for this category" },
  created: { type: Date, default: Date.now },
  icon: String,
  isActive: { type: Boolean, default: true }
});

export default mongoose.model<CategoryDocument>("Category", CategorySchema);
