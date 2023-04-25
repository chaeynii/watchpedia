import { Router } from "express";
import { categoryService } from "../services";
import { loginRequired } from "../middlewares";

const categoryRouter = Router();

function nextError(callback) {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

// 카테고리 조회 라우터
categoryRouter.get(
  "/:categoryId", // model에 기능마다 id를 정의해놨는데 따로 정의할 필요없는지 _id가  categoryId 인것을 여쭤보자!
  nextError(async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      const error = new Error("카테고리를 찾을 수 없습니다.");
      error.status = 404;
      throw error;
    }
    return res.status(200).json({ category });
  })
);

// 카테고리 전체 조회 라우터
categoryRouter.get(
  "/",
  nextError(async (req, res, next) => {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json({ categories });
  })
);

// 카테고리 생성 라우터
categoryRouter.post("/category", async function (req, res, next) {
  try {
    const categoryData = req.body;
    const createdCategory = await categoryService.addCategory(categoryData);

    console.log("Success Category", categoryData);

    res.status(200).json({ category: createdCategory });
  } catch (error) {
    console.log("/category error", error);
  }
});

//  카테고리 업데이트 라우터, admin 추가해야댐
categoryRouter.put(
  "/:categoryId",
  loginRequired,
  nextError(async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const categoryData = req.body;
    const updateCategory = await categoryService.updateCategory(
      categoryId,
      categoryData
    );
    return res.status(200).json({ category: updateCategory });
  })
);

// 카테고리 삭제 라우터, admin 추가해야댐
categoryRouter.delete(
  "/:categoryId",
  loginRequired,
  nextError(async (req, res, next) => {
    const categoryId = req.params.categoryId;
    await categoryService.deleteCategory(categoryId);
    return res.status(200).json();
  })
);

export { categoryRouter };
