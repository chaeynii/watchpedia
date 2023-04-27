import { Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  parentCategory: { type: Schema.Types.ObjectId, ref: "Category" },
});

export { categorySchema };
