import Category from "../models/Category";
import express from "express";

// GET
const getCategoriesAsync = async (
  req: express.Request,
  res: express.Response
) => {
  // const categories = await Category.find({ isActive: true });
  const categories = await Category.find({});

  res.send(categories);
};

// // POST
const createCategoryAsync = async (
  req: express.Request,
  res: express.Response
) => {
  const category = new Category(req.body);

  await category.save();
  res.send(category);
};

// // DELETE
// // TODO: Do we want to set an isActive flag to replicate soft deletes?
const deleteCategoryAsync = async (
  req: express.Request,
  res: express.Response
) => {
  const category = await Category.findById(req.params.id);
  category.isActive = false;

  await category.save();

  res.sendStatus(204);
};

export default {
  getCategoriesAsync,
  createCategoryAsync,
  deleteCategoryAsync
};
