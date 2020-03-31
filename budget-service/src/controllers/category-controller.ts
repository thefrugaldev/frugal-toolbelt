import Category, { ICategory } from "../models/Category";
import express from "express";

// GET
async function getCategoriesAsync(): Promise<ICategory[]> {
  const categories = await Category.find({ isActive: true });

  return categories;
}

// // POST
// createCategoryAsync = async (req: express.Request, res: express.Response) => {
//   const category = new Category(req.body);

//   await category.save();
//   res.send(category);
// };

// // DELETE
// // TODO: Do we want to set an isActive flag to replicate soft deletes?
// deleteCategoryAsync = async (req: express.Request, res: express.Response) => {
//   const category = await Category.findById(req.params.id);
//   //   category.isActive = false;

//   await category.save();

//   res.sendStatus(204);
// };

export default {
  getCategoriesAsync
};
