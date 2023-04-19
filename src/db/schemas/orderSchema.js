import { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productList: [
      {
        type: Schema.Types.objectId,
        ref: "product",
        required: true,
      },
    ],
    countList: [
      {
        type: Number,
        required: true,
      },
    ],
    shippingStatus: {
      type: String,
      default: "배송준비중",
    },
    postCode: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    extraAddress: {
      type: String,
      required: true,
    },
    extraAddress: {
      type: String,
      required: false,
    },
    totalAmount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

export { orderSchema };
