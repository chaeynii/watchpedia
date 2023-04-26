import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    longContent: {
      type: String,
    },
    shortContent: {
      type: String,
    },
    smallImageURL: {
      type: String,
    },
    bigImageURL: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    color: [
      {
        type: String,
        required: true,
      },
    ],
    stock: {
      type: String,
      default: 10,
    },
  },
  { timestamps: true }
);
export { productSchema };
