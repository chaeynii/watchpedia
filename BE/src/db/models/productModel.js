import { model } from "mongoose";
import { productSchema } from "../schemas/productSchema";

const Product = model("Product", productSchema);

// 상품 생성
const createProduct = async (productInfo) => {
  const createdproduct = await Product.create(productInfo);
  return createdproduct;
};

// 이름 기반 상품 조회
const findProductByName = async (name) => {
  const product = await Product.findOne({ name: name });
  return product;
};

// 전체 목록 조회
const findAllproducts = async () => {
  const products = await Product.findAll({});
  return products;
};

// 상품 업데이트
const updateProduct = async (name, update) => {
  const filter = { name: name };
  const option = { returnOriginal: false };

  const updateProduct = await Product.findOneAndUpdate(filter, update, option);
  return updateProduct;
};

// 상품 삭제
const deleteProduct = async (name) => {
  const deletedProduct = await Product.findOneAndRemove({ name: name });
  return deletedProduct;
};

export {
  findProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
  findAllproducts,
};
