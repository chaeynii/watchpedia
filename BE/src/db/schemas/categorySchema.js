import { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    nameLarge: {
      type: String,
      required: true,
    },
    nameSmall: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export { categorySchema };
