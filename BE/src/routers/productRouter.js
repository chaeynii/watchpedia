import { Router } from "express";
import { productService } from "../services";
import { loginRequired } from "../middlewares";
// admin middelware 추가
const productRouter = Router();

// nextError 함수 정의
function nextError(callback) {
  return async (req, res, next) => {
    try {
      // 콜백 함수 실행
      await callback(req, res, next);
    } catch (error) {
      // 에러 처리 미들웨어로 에러를 전달
      next(error);
    }
  };
}

// 상품 조회 라우터
productRouter.get(
  "/:name",
  nextError(async (req, res, next) => {
    const name = req.params.name;
    const product = await productService.getProductByName(name);
    if (!product) {
      const error = new Error("상품을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return res.status(200).json({ product });
  })
);

productRouter.post("/product", async function (req, res, next) {
  try {
    const productInfo = req.body;
    const createdProduct = await productService.addProduct(productInfo);

    console.log("Success Product", productInfo);
    // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
    res.status(200).json({ product: createdProduct });
  } catch (error) {
    console.log("/product error", error);
  }
});
// 상품 업데이트 라우터, admin 추가해야함
productRouter.put(
  "/:name",
  loginRequired,
  nextError(async (req, res, next) => {
    const productName = req.params.name;
    const productInfo = req.body;
    const updatedProduct = await productService.updateProductByName(
      productName,
      productInfo
    );
    return res.status(200).json({ product: updatedProduct });
  })
);

// 상품 삭제 라우터 , admin 추가해야함
productRouter.delete(
  "/:name",
  loginRequired,
  nextError(async (req, res, next) => {
    const productName = req.params.name;
    await productService.deleteProductByName(productName);
    return res.status(200).json();
  })
);

// 상품 검색 라우터 => 검색 기능 없음
// productRouter.get(
//   "/search/:inputValue",
//   nextError(async (req, res, next) => {
//     const inputValue = req.params.inputValue;
//     const searchedProduct = await productService.searchProduct(inputValue);
//     return res.status(200).json({ product: searchedProduct });
//   })
// );

export { productRouter };
