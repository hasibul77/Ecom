import {
  WishListService,
  SaveWishListService,
  RemoveWishListService
} from "../services/WishListServices.js";

export const WishList = async (req, res) => {
  const result = await WishListService(req);
  return res.status(200).json(result);
};

export const SaveWishList = async (req, res) => {
  const result = await SaveWishListService(req);
  return res.status(200).json(result);
};

export const RemoveWishList = async (req, res) => {
  const result = await RemoveWishListService(req);
  return res.status(200).json(result);
};
