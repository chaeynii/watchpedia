import { model } from "mongoose";
import { productSchema } from "../schemas/productSchema";

const Product = model("Product", productSchema);

// 상품 생성
const createProduct = async (productInfo) => {
  const createdproduct = await Product.create(productInfo);
  return createdproduct;
};

// Id 기반 상품 조회
const findProductById = async (productId) => {
  const product = await Product.findOne({ _id: productId });
  return product;
};

// Id 상품 목록 조회
const findAllproducts = async () => {
  const products = await Product.findAll({});
  return products;
};

// 상품 업데이트
const updateProduct = async (productId, update) => {
  const filter = { _id: productId };
  const option = { returnOriginal: false };

  const updateProduct = await Product.findOneAndUpdate(filter, update, option);
  return updateProduct;
};

// 상품 삭제
const deleteProduct = async (productId) => {
  const deletedProduct = await Product.findOneAndRemove({ _id: productId });
  return deletedProduct;
};

export {
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  findAllproducts,
};
