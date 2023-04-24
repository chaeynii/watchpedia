import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    category: {
      // 예를 들어 스마트워치 안에 애플까지 넣는 거를 표현한건데 이렇게 하는게 맞나?
      nameLarge: {
        type: String,
      },
      nameSmall: {
        type: String,
      },
    },
    longContent: { type: String },
    shortContent: { type: String },
    smallImageURL: { type: String },
    bigImageURL: { type: String },
    price: { type: Number, required: true },
    color: [{ type: String, required: true }], // 이것도 배열로 받아야하나?
    stock: { type: String, default: 10, required: true },
  },
  { timestamps: true }
);
export { productSchema };
