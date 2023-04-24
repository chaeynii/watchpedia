import { model } from "mongoose";
import { orderSchema } from "../schemas/orderSchema";

const Order = model("order", orderSchema);


export class OrderModel {

  //상품관련 정보 가져오기
  async productCheck(){
    const getProduct = await Order.find({}).populate(['productInfo', 'buyer'])
    return getProduct;
  }


  //주문하기
  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  

  //사용자들 주문내역 조회
  // async findAll() {
  //   const orders = await Order.find({});
  //   return orders;
  // }

  // async update({ userId, update }) {
  //   const filter = { _id: userId };
  //   const option = { returnOriginal: false };

  //   const updatedUser = await User.findOneAndUpdate(filter, update, option);
  //   return updatedUser;
  // }

  // async delete(userId){

  //   const deletedUser  = await User.deleteOne(userId)

  //   return deletedUser

  // }
}

const orderModel = new OrderModel();

export { orderModel };
