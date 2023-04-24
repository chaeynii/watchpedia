import { model } from "mongoose";
import { categorySchema } from "../schemas/categorySchema";

const Category = model("Category", categorySchema);

// 특정 카테고리 조회 _id
const findCategoryById = async (categoryId) => {
  try {
    const category = await Category.findOne({ _id: categoryId });
    return category;
  } catch (error) {
    console.log("ID Category 조회 오류", error);
    throw error;
  }
};

// 특정 카테고리 조회 name
const findCategoryByName = async (name) => {
  try {
    const category = await Category.findOne({ name });
    return category;
  } catch (error) {
    console.log("이름 Category 조회 오류", error);
    throw error;
  }
};

// 모든 카테고리 조회
const findAllCategory = async () => {
  try {
    const categoryList = await Category.find({});
    return categoryList;
  } catch (error) {
    console.log("전체 카테고리 조회 오류", error);
    throw error;
  }
};

// 새로운 카테고리 생성
const createCategory = async (categoryInfo) => {
  try {
    const createNewCategory = await Category.create(categoryInfo);
    return createNewCategory;
  } catch (error) {
    console.log("새 카테고리 생성 오류", error);
    throw error;
  }
};

// 카테고리 수정
const updateCategory = async (categoryId, categoryInfo) => {
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      categoryInfo,
      { new: true }
    );
    return updatedCategory;
  } catch (error) {
    console.log("카테고리 수정 오류", error);
    throw error;
  }
};

// 카테고리 삭제
const deleteCategory = async (categoryId) => {
  try {
    await Category.deleteOne({ _id: categoryId });
  } catch (error) {
    console.log("카테고리 삭제 오류", error);
    throw error;
  }
};

export {
  findCategoryById,
  findCategoryByName,
  findAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
