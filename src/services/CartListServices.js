import CartModel from "../models/CartModel.js";
import mongoose from "mongoose";

const ObjectID = mongoose.Types.ObjectId;

export const CartListService = async (req) => {
  try {
    const user_id = new ObjectID(req.headers.user_id);
    const matchStage = { $match: { userID: user_id } };

    const JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product"
      }
    };
    const unwindProductStage = { $unwind: "$product" };

    const JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand"
      }
    };
    const unwindBrandStage = { $unwind: "$brand" };

    const JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category"
      }
    };
    const unwindCategoryStage = { $unwind: "$category" };

    const projectionStage = {
      $project: {
        userID: 0,
        createAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0
      }
    };

    const data = await CartModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
      projectionStage
    ]);

    return { status: "success", data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong!" };
  }
};

export const SaveCartListService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const reqBody = { ...req.body, userID: user_id };
    await CartModel.create(reqBody);
    return { status: "success", message: "Cart List Create Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong!" };
  }
};

export const UpdateCartListService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const cartID = req.params.cartID;
    const reqBody = req.body;
    await CartModel.updateOne({ _id: cartID, userID: user_id }, { $set: reqBody });
    return { status: "success", message: "Cart List Update Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong!" };
  }
};

export const RemoveCartListService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const reqBody = { ...req.body, userID: user_id };
    await CartModel.deleteOne(reqBody);
    return { status: "success", message: "Cart List Remove Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong!" };
  }
};
