import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { orderService } from "../services";

const orderRouter = Router();

orderRouter.get("/order", async ( req, res, next) => {
  try{
    const productInfo = await orderService.getProduct()

    res.status(201).send(productInfo)
  }catch(error){
    next(error)
  }
})


// 주문하기
orderRouter.post("/order/order_info", loginRequired ,async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const productInfo = req.body.productInfo;
    const productCount = req.body.productCount;
    const buyer = req.body.buyer;
    const shippingStatus = req.body.shippingStatus;
    const orderDate = req.body.orderDate;
    const orderNumber = req.body.orderNumber;
    const totalAmount = req.body.totalAmount;
    const totalPrice = req.body.totalPrice;
    const zipCode = req.body.zipCode;
    const extraAddress= req.body.extraAddress
    const receiverName = req.body.receiverName;
    const receiverPhone = req.body.receiverPhone;

    // 위 데이터를 유저 db에 추가하기
    const newOrder = await orderService.addOrder({
      productInfo,
      productCount,
      buyer,
      shippingStatus,
      orderDate,
      orderNumber,
      totalAmount,
      totalPrice,
      zipCode,
      extraAddress,
      receiverName,
      receiverPhone
    });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});



export { orderRouter };
