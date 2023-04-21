import { Schema } from "mongoose";

const OrderSchema = new Schema(
 {
  productList:{
    type: String
  },
  buyer:{
    type: ['결제완료', ],
  },
 }
);

export { UserSchema };

