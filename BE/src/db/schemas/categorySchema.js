import { Schema } from "mongoose";

const subCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subCategory: [subCategorySchema],
});

export { categorySchema };
