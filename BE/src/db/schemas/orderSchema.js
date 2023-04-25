import { Schema } from "mongoose";

const orderSchema = new Schema({
  productInfo:{
    type: Schema.Types.ObjectId,
    ref:"Product",
  },
  productCount:{
    type: [Number],
    default: 1,
  },
  buyer:{
    type: Schema.Types.ObjectId,
    ref:"users",
  },
  shippingStatus:{
    type: String,
    enum: ['배송준비중', '배송중', '배송완료', '결제완료'],
    default:"결제완료",
  },
  orderDate:{
    type: Date,
    // required:true,
    default: new Date()
  },
  orderNumber:{
    type: String,
    // required: true
  },
  totalAmount:{
    type: Number,
  },
  totalPrice:{
    type: Number,
  },
  zipCode:{
    type: String,
    required: true
  },
  extraAddress:{
    type: String,
    required: true
  },
  receiverName:{
    type: String,
    required: true
  },
  receiverPhone:{
    type: String,
    required: true
  },
},{
    timestamps: true 
});

export { orderSchema };
