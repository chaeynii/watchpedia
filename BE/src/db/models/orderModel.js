import { model } from "mongoose";
import { orderSchema } from "../schemas/orderSchema";

const Order = model("order", orderSchema);

export class OrderModel {
<<<<<<< HEAD

  //주문한ID로 불러오기
  async findByOrderId(orderId){
    const order = await Order.findOne({_id: orderId})
                              .populate('productInfo')
                              .populate('buyer')
    return order
  }

  //모든 주문 조회
  async findAllOrder(){
=======
  async findByOrderId(orderId) {
    const order = await Order.findOne({ _id: orderId })
      .populate("productInfo")
      .populate("buyer");
    return order;
  }
  async findAllOrder() {
>>>>>>> 3f0f2c46382799d18f90376afc718b34780e1a13
    const orderList = await Order.find({})
      .populate("productInfo")
      .populate("buyer");
    return orderList;
  }
  //주문하기
  async create(orderInfo) {
    const createNewOrder = await Order.create(orderInfo);

<<<<<<< HEAD
  async update({ orderId, update }) {
    const filter = { _id: orderId };
    const option = { returnOriginal: false };

    const updateOrder = await Order.findOneAndUpdate(filter, update, option);
    return updateOrder;
  }

  async deleteOrder(orderId){
    const deleteOrder = await Order.deleteOne(orderId)

    return deleteOrder
  }

=======
    return createNewOrder;
  }
>>>>>>> 3f0f2c46382799d18f90376afc718b34780e1a13
}

const orderModel = new OrderModel();

export { orderModel };
