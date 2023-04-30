import { userModel } from "../db";
import { orderModel } from "../db/models/orderModel";
const productModel = require("../db/models/productModel");

class OrderService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(orderModel) {
    this.orderModel = orderModel;
    this.userModel = userModel;
    this.productModel = productModel;
  }

  async getOrderId(orderId){
    const order = await orderModel.findByOrderId(orderId)

    return order
  }

  //리스트 전체 조회
  async getOrders(){
    const orders = await orderModel.findAllOrder()

    return orders;
  }

  //주문하기
  async addOrder(orderInfo) {
    // 객체 destructuring
    const { productInfo ,productCount, buyer, shoppingStatus, orderDate, 
      totalAmount, totalPrice,zipCode, extraAddress, extraAddress_2,receiverName,receiverPhone } = orderInfo;
    
    //주문자 정보 불어오기
    const buyerId = await this.userModel.findById({_id: buyer})
    // 주문번호 랜덤생성
    const randomNum = String(Math.random().toFixed(5) * 10);
    //주문번호 날짜 생성
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDay()
    const createOrderNum = year + month + day + randomNum.replace('.','');

    console.log()

    const newOrderInfo = { productInfo, productCount, buyer: buyerId, shoppingStatus, orderDate, orderNumber: createOrderNum, 
      totalAmount, totalPrice, zipCode,  extraAddress, extraAddress_2, receiverName, receiverPhone };

    // db에 저장
    const createdOrder = await this.orderModel.create(newOrderInfo);

    return createdOrder;
  }

  //주문내용수정
  async setOrder(orderInfoRe, toUpdate){
    
    const { orderId } = orderInfoRe

    let order = await this.orderModel.findByOrderId(orderId)

    if(!order){
      throw new Error('조회한 주문내역이 없습니다!')
    }

    order = await this.orderModel.update({
      orderId,
      update: toUpdate
    })

    return order
  }

  //주문삭제
  async deleteOrder(orderId){
    const removeOrder = await this.orderModel.deleteOrder(orderId)
    
    return removeOrder
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
