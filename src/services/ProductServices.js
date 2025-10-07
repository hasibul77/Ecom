// src/services/ProductServices.js
import mongoose from "mongoose";
import BrandModel from "../models/BrandModel.js";
import CategoryModel from "../models/CategoryModel.js";
import ProductSliderModel from "../models/ProductSliderModel.js";
import ProductModel from "../models/ProductModel.js";
import ReviewModel from "../models/ReviewModel.js";

const { ObjectId } = mongoose.Types;

// Brand List
export const BrandListService = async () => {
  try {
    const data = await BrandModel.find();
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// Category List
export const CategoryListService = async () => {
  try {
    const data = await CategoryModel.find();
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// Slider List
export const SliderListService = async () => {
  try {
    const data = await ProductSliderModel.find();
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// Products by Brand
export const ListByBrandService = async (req) => {
  try {
    const BrandID = new ObjectId(req.params.BrandID);
    const data = await ProductModel.aggregate([
      { $match: { brandID: BrandID } },
      { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } },
      { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } },
      { $unwind: "$brand" },
      { $unwind: "$category" },
      { $project: { "brand._id": 0, "category._id": 0, brandID: 0, categoryID: 0 } }
    ]);
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// Products by Category
export const ListByCategoryService = async (req) => {
  try {
    const CategoryID = new ObjectId(req.params.CategoryID);
    const data = await ProductModel.aggregate([
      { $match: { categoryID: CategoryID } },
      { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } },
      { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } },
      { $unwind: "$brand" },
      { $unwind: "$category" },
      { $project: { "brand._id": 0, "category._id": 0, brandID: 0, categoryID: 0 } }
    ]);
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// Products by Remark
export const ListByRemarkService = async (req) => {
  try {
    const Remark = req.params.Remark;
    const data = await ProductModel.aggregate([
      { $match: { remark: Remark } },
      { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } },
      { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } },
      { $unwind: "$brand" },
      { $unwind: "$category" },
      { $project: { "brand._id": 0, "category._id": 0, brandID: 0, categoryID: 0 } }
    ]);
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// Similar Products
export const ListBySimilarService = async (req) => {
  try {
    const CategoryID = new ObjectId(req.params.CategoryID);
    const data = await ProductModel.aggregate([
      { $match: { categoryID: CategoryID } },
      { $limit: 20 },
      { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } },
      { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } },
      { $unwind: "$brand" },
      { $unwind: "$category" },
      { $project: { "brand._id": 0, "category._id": 0, brandID: 0, categoryID: 0 } }
    ]);
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// Product Details
export const DetailsService = async (req) => {
  try {
    const ProductID = new ObjectId(req.params.ProductID);
    const data = await ProductModel.aggregate([
      { $match: { _id: ProductID } },
      { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } },
      { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } },
      { $lookup: { from: "productdetails", localField: "_id", foreignField: "productID", as: "details" } },
      { $unwind: "$brand" },
      { $unwind: "$category" },
      { $unwind: "$details" },
      { $project: { "brand._id": 0, "category._id": 0, brandID: 0, categoryID: 0 } }
    ]);
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// Products by Keyword
export const ListByKeywordService = async (req) => {
  try {
    const SearchRegex = { $regex: req.params.Keyword, $options: "i" };
    const data = await ProductModel.aggregate([
      { $match: { $or: [{ title: SearchRegex }, { shortDes: SearchRegex }] } },
      { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } },
      { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } },
      { $unwind: "$brand" },
      { $unwind: "$category" },
      { $project: { "brand._id": 0, "category._id": 0, brandID: 0, categoryID: 0 } }
    ]);
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// Review List
export const ReviewListService = async (req) => {
  try {
    const ProductID = new ObjectId(req.params.ProductID);
    const data = await ReviewModel.aggregate([
      { $match: { productID: ProductID } },
      { $lookup: { from: "profiles", localField: "userID", foreignField: "userID", as: "profile" } },
      { $unwind: "$profile" },
      { $project: { des: 1, rating: 1, "profile.cus_name": 1 } }
    ]);
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// Create Review
export const CreateReviewService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const reqBody = req.body;
    const data = await ReviewModel.create({
      productID: reqBody.productID,
      userID: user_id,
      des: reqBody.des,
      rating: reqBody.rating
    });
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

export const ListByFilterService = async (req) => {
  try {
    const matchConditions = {};
    if (req.body.categoryID) matchConditions.categoryID = new ObjectId(req.body.categoryID);
    if (req.body.brandID) matchConditions.brandID = new ObjectId(req.body.brandID);

    const priceMin = parseInt(req.body.priceMin);
    const priceMax = parseInt(req.body.priceMax);

    // Build numericPrice match properly
    const priceMatch = {};
    if (!isNaN(priceMin)) priceMatch.$gte = priceMin;
    if (!isNaN(priceMax)) priceMatch.$lte = priceMax;

    const pipeline = [
      { $match: matchConditions },
      { $addFields: { numericPrice: { $toInt: "$price" } } }
    ];

    if (Object.keys(priceMatch).length > 0) {
      pipeline.push({ $match: { numericPrice: priceMatch } });
    }

    pipeline.push(
      { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } },
      { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } },
      { $unwind: "$brand" },
      { $unwind: "$category" },
      { $project: { "brand._id": 0, "category._id": 0, brandID: 0, categoryID: 0 } }
    );

    const data = await ProductModel.aggregate(pipeline);

    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};