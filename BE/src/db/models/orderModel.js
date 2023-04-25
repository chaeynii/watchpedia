import { model } from "mongoose";
import { orderSchema } from "../schemas/orderSchema";

const Order = model("order", orderSchema);


export class OrderModel {

  async findByOrderId(orderId){
    const order = await Order.findOne({_id: orderId})
                              .populate('productInfo')
                              .populate('buyer')
    return order
  }
  async findAllOrder(){
    const orderList = await Order.find({})
                                 .populate('productInfo')
                                 .populate('buyer')
    return orderList
  }

  //주문하기
  async create(orderInfo) {
    const createNewOrder = await Order.create(orderInfo)
                                       
    return createNewOrder
  }

}

const orderModel = new OrderModel();

export { orderModel };
