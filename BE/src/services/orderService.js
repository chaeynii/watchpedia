import { orderModel } from "../db";

class OrderService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async getProduct(){
    const productInfo = await this.orderModel.productCheck();
    return productInfo
  }

  // 사용자 주문하기
  async addOrder(orderInfo) {
    // 객체 destructuring
    const { productInfo, productCount, buyer,shippingStatus, orderDate, orderNumber, totalAmount, totalPrice,zipCode, extraAddress,receiverName,receiverPhone } = orderInfo;

    // 주문번호 랜덤생성
    const randomNum = String((Math.random().toFixed(6)) * 10)
    const createOrderNum = orderDate + randomNum.replace('.','');

    const newOrderInfo = { productInfo, productCount, buyer, shippingStatus, orderDate, orderNumber: createOrderNum, 
      totalAmount, totalPrice, zipCode,  extraAddress, receiverName, receiverPhone };


    // db에 저장
    const createdOrder = await this.orderModel.create(newOrderInfo);

    return createdOrder;
  }

  

}

const orderService = new OrderService(orderModel);

export { orderService };
