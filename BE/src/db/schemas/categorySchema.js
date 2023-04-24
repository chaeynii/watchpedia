import { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    smartwatch: [
      {
        type: String,
      },
    ],
    strap: [
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
