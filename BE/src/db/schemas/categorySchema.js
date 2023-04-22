import { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    watch: {
      type: String,
    },
    strap: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "categories",
  }
);

export { categorySchema };
