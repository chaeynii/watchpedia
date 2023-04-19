import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    longContent: { type: String, required: true },
    shortContent: { type: String, required: true },
    smallImageURL: { type: String, required: true },
    bigImageURL: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    stock: { type: String, default: 10, required: true },
  },
  { timestamps: true, collection: "products" }
);
git;
