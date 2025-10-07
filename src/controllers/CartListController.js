import {
  CartListService,
  SaveCartListService,
  UpdateCartListService,
  RemoveCartListService
} from "../services/CartListServices.js";

export const CartList = async (req, res) => {
  const result = await CartListService(req);
  return res.status(200).json(result);
};

export const SaveCartList = async (req, res) => {
  const result = await SaveCartListService(req);
  return res.status(200).json(result);
};

export const UpdateCartList = async (req, res) => {
  const result = await UpdateCartListService(req);
  return res.status(200).json(result);
};

export const RemoveCartList = async (req, res) => {
  const result = await RemoveCartListService(req);
  return res.status(200).json(result);
};
