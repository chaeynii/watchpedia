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
  "/:productId",
  nextError(async (req, res, next) => {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);
    if (!product) {
      const error = new Error("상품을 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return res.status(200).json({ product });
  })
);

// 상품 추가 라우터
productRouter.post(
  "/product",
  nextError(async (req, res, next) => {
    const productInfo = req.body;
    const createdProduct = await productService.addProduct(productInfo);
    return res.status(200).json({ product: createdProduct });
  })
);
// 상품 업데이트 라우터, admin 추가해야함
productRouter.put(
  "/:productId",
  loginRequired,
  nextError(async (req, res, next) => {
    const productId = req.params.productId;
    const productInfo = req.body;
    const updatedProduct = await productService.updateProductById(
      productId,
      productInfo
    );
    return res.status(200).json({ product: updatedProduct });
  })
);

// 상품 삭제 라우터 , admin 추가해야함
productRouter.delete(
  "/:productId",
  loginRequired,
  nextError(async (req, res, next) => {
    const productId = req.params.productId;
    await productService.deleteProductById(productId);
    return res.status(200).json();
  })
);

// 상품 검색 라우터
productRouter.get(
  "/search/:inputValue",
  nextError(async (req, res, next) => {
    const inputValue = req.params.inputValue;
    const searchedProduct = await productService.searchProduct(inputValue);
    return res.status(200).json({ product: searchedProduct });
  })
);

export { productRouter };
