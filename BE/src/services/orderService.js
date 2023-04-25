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

  async getOrders() {
    const orders = await orderModel.findAllOrder();

    return orders;
  }

  //주문하기
  async addOrder(orderInfo) {
    // 객체 destructuring
    const {
      productInfo,
      productCount,
      buyer,
      shippingStatus,
      orderDate,
      totalAmount,
      totalPrice,
      zipCode,
      extraAddress,
      receiverName,
      receiverPhone,
    } = orderInfo;

    const buyerId = await this.userModel.findById({ _id: buyer });

    const productId = await this.productModel.findProductById({
      _id: productInfo,
    });

    // 주문번호 랜덤생성
    const randomNum = String(Math.random().toFixed(5) * 10);
    //주문번호 날짜 생성
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDay();
    const createOrderNum = year + month + day + randomNum.replace(".", "");

    const newOrderInfo = {
      productInfo: productId,
      productCount,
      buyer: buyerId,
      shippingStatus,
      orderDate,
      orderNumber: createOrderNum,
      totalAmount,
      totalPrice,
      zipCode,
      extraAddress,
      receiverName,
      receiverPhone,
    };

    // db에 저장
    const createdOrder = await this.orderModel.create(newOrderInfo);

    return createdOrder;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
