import mongoose, { Schema, Document } from "mongoose";

export interface Quote {
  symbol: string;
  description: string;
  type: string;
  open?: number;
  close?: number;
  high?: number;
  low?: number;
  volume?: number;
}

interface QuoteDocument extends Document, Quote {}

const quoteSchema: Schema = new Schema({
  type: {
    type: String,
    enum: ["stock", "option", "etf", "index", "mutual_fund"],
  },
});

export default mongoose.model<QuoteDocument>("Quote", quoteSchema);
