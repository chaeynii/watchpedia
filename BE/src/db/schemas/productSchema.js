import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    category: { type: String }, // 배열로 받아야하나 코치님께 여쭤보기
    longContent: { type: String, required: true },
    shortContent: { type: String, required: true },
    smallImageURL: { type: String, required: true },
    bigImageURL: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true }, // 이것도 배열로 받아야하나?
    stock: { type: String, default: 10, required: true },
  },
  { timestamps: true }
);
export { productSchema };
