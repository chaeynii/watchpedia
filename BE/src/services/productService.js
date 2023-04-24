// import { productModel } from "../db";

const productModel = require("../db/models/productModel");

// 상품 정보를 받아와 데이터베이스에 새로운 상품을 추가
const addProduct = async (productInfo) => {
  console.log(productInfo);
  const createProduct = await productModel.createProduct(productInfo);

  return createProduct;
};
// 이름을 기반으로 데이터베이스에 해당 상품을 가져옴
const getProductByName = async (name) => {
  const findProduct = await productModel.findProductByName(name);
  if (!findProduct) {
    throw new Error("해당 상품은 없습니다.");
  }
  return findProduct;
};
// 모든 상품을 가져옴
const getAllProduct = async () => {
  const findAllProducts = await productModel.findAll();
  return findAllProducts;
};
// 이름을 기반으로 데이터베이스에 상품 정보를 업데이트
const updateProductByName = async (name, productInfo) => {
  const updateProduct = await productModel.update(name, productInfo);
  return updateProduct;
};
// 이름을 기반으로 데이터베이스에 상품을 삭제
const deleteProductByName = async (name, productInfo) => {
  const deleteProduct = await productModel.delete(name, productInfo);
  return deleteProduct;
};
// 검색어를 기반으로 데이터베이스에 상품을 검색 => 검색기능 없음
// const searchProduct = async (inputValue) => {
//   const searchedProduct = await productModel.search(inputValue);
//   return searchedProduct;
// };

const productService = {
  addProduct,
  getProductByName,
  getAllProduct,
  updateProductByName,
  deleteProductByName,
};

export { productService };
