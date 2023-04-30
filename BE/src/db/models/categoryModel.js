import { model } from "mongoose";
import { categorySchema } from "../schemas/categorySchema";

const Category = model("Category", categorySchema);

// 카테고리 생성
const createCategory = async (categoryData) => {
  const createdCategory = await Category.create(categoryData);
  return createdCategory;
};

// ID 기반 카테고리 조회
const findCategoryById = async (categoryId) => {
  const category = await Category.findOne({ _id: categoryId });
  return category;
};

const findAllCategories = async () => {
  const categories = await Category.find({});
  return categories;
};

// 카테고리 업데이트
const updateCategory = async (categoryId, update) => {
  const filter = { _id: categoryId };
  const option = { returnOriginal: false }; // 업데이트 된 이후의 정보가 반환
  const updateCategory = await Category.findOneAndUpdate(
    filter,
    update,
    option
  );
  return updateCategory;
};

// 카테고리 삭제
const deleteCategory = async (categoryId) => {
  const deletedCategory = await Category.findOneAndRemove({ _id: categoryId });
  return deletedCategory;
};

export {
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  findAllCategories,
};
