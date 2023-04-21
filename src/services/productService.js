import { productModel } from "../db";

// 상품 정보를 받아와 데이터베이스에 새로운 상품을 추가
const addProduct = async (productInfo) => {
  const createProduct = await productModel.create(productInfo);
  return createProduct;
};
// 상품 ID를 기반으로 데이터베이스에 해당 상품을 가져옴
const getProductById = async (productId) => {
  const findProduct = await productModel.findById(productId);
  return findProduct;
};
// 상품 배열을 기반으로 데이터베이스에 상품 목록을 가져옴
// 매개변수가 제공되지 않으면 데이터베이스에 모든 상품을 가져옴
const getProductsById = async (productIds) => {
  if (!productIds) {
    const products = await productModel.findAll();
    return products;
  } else {
    const products = await productModel.findByIds(productIds);
    return products;
  }
};
// 상품 ID를 기반으로 데이터베이스에 상품 정보를 업데이트
const updateProductById = async (productId, productInfo) => {
  const updateProduct = await productModel.update(productId, productInfo);
  return updateProduct;
};
// 상품 ID를 기반으로 데이터베이스에 상품을 삭제
const deleteProductById = async (productId, productInfo) => {
  const deleteProduct = await productModel.delete(productId, productInfo);
  return deleteProduct;
};
// 검색어를 기반으로 데이터베이스에 상품을 검색
const searchProduct = async (inputValue) => {
  const searchedProduct = await productModel.search(inputValue);
  return searchedProduct;
};

const productService = {
  addProduct,
  getProductById,
  getProductsById,
  updateProductById,
  deleteProductById,
  searchProduct,
};

export { productService };
