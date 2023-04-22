import { categoryModel } from "../db";

// 새로운 카테고리를 데이터베이스에 추가
const addCategory = async (categoryInfo) => {
  const createCategory = await categoryModel.create(categoryInfo);
  return createCategory;
};
// Id를 기반으로 조회된 카테고리 객체 반환
const getCategoryById = async (categoryId) => {
  const findCategory = await categoryModel.findById(categoryId);
  return findCategory;
};

// name 기반으로 조회된 카테고리 객체 반환
const getCategoryByName = async (name) => {
  const findCategory = await categoryModel.findByName(name);
  return findCategory;
};
// 카테고리 목록 전체 반환
const getAllCategories = async () => {
  const allCategories = await categoryModel.findAll();
  return allCategories;
};
// 수정된 카테고리 반환
const editCategory = async (categoryId, categoryInfo) => {
  const updatedCategory = await categoryId.update(categoryId, categoryInfo);
  return updatedCategory;
};
// Id를 기반으로 해당하는 카테고리 삭제
const removeCategory = async (categoryId) => {
  await categoryModel.delete(categoryId);
};

const categoryService = {
  addCategory,
  getCategoryById,
  getCategoryByName,
  getAllCategories,
  editCategory,
  removeCategory,
};

export { categoryService };
