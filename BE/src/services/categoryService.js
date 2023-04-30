// import { categoryModel } from "../db/models/categoryModel"

const categoryModel = require("../db/models/categoryModel");
// 새로운 카테고리 추가
const addCategory = async (categoryData) => {
  const createCategory = await categoryModel.createCategory(categoryData);
  return createCategory;
};

// Id를 기반으로 카테고리 검색
const getCategoryById = async (categoryId) => {
  const findProduct = await categoryModel.findCategoryById(categoryId);
  if (!categoryId) {
    throw new Error("해당 카테고리가 없습니다.");
  }
  return findProduct;
};

// 모든 카테고리 반환
const getAllCategories = async () => {
  const findAllCategories = await categoryModel.findAllCategories();
  return findAllCategories;
};

// 카테고리 업데이트
const updateCategory = async (categoryId, categoryData) => {
  const updatedCategory = await categoryModel.updateCategory(
    categoryId,
    categoryData
  );
  return updatedCategory;
};

// 카테고리 삭제
const deleteCategory = async (categoryId, categoryData) => {
  const deletedCategory = await categoryModel.deleteCategory(
    categoryId,
    categoryData
  );
  return deletedCategory;
};

const categoryService = {
  addCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
};

export { categoryService };
