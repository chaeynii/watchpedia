import { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    nameLarge: {
      type: String,
    },
    nameSmall: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export { categorySchema };
