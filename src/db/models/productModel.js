import { model } from "mongoose";
import { productSchema } from "../schemas/productSchema";
import { categoryModel } from "../categoryModel";

const Product = model("Product", productSchema);

// 특정 상품 조회 _id
const findProductById = async (productId) => {
  try {
    const product = await Product.findOne({ _id: productId });
    return product;
  } catch (error) {
    console.log("ID 상품 조회 오류", error);
    throw error;
  }
};

// 특정 상품 목록 조회 _id 배열
const findProductsByIds = async (productIds) => {
  try {
    const productList = await Product.find({
      _id: { $in: productIds },
    }).populate("category");
    return productList;
  } catch (error) {
    console.log("ID 상품 목록 조회 오류", error);
    throw error;
  }
};

// 모든 상품 조회
const findAllProducts = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    console.log("전체 상품 조회 오류", error);
    throw error;
  }
};

// 상품 생성
const createProduct = async (productData) => {
  try {
    productData.category = await categoryModel.findByName(productData.category);
    const product = new Product(productData);
    const createProduct = await product.save();
    return createProduct;
  } catch (error) {
    console.log("상품 생성 오류", error);
    throw error;
  }
};

// 상품 수정 _id
const updateProductById = async (productId, productData) => {
  try {
    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId },
      productData,
      { new: true }
    );
    return updateProduct;
  } catch (error) {
    console.log("상품 수정 오류", error);
    throw error;
  }
};

// 상품 삭제 _id
const deleteProductById = async (productId) => {
  try {
    const deletedProduct = await Product.findOneAndRemove({
      id: productId,
    });
    return deletedProduct;
  } catch (error) {
    console.log("상품 삭제 오류", error);
    throw error;
  }
};

// 상품 검색
const searchProducts = async (searchBy) => {
  try {
    if (searchBy.category) {
      const productCategory = await categoryModel.findByName(searchBy.category);
      searchBy.category = productCategory._id;
    }
    const productList = await Product.find(searchBy);

    return productList;
  } catch (error) {
    console.log("상품 검색 오류", error);
    throw error;
  }
};

export {
  findProductById,
  findProductsByIds,
  findAllProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  searchProducts,
};
