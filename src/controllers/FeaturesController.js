import { FeaturesListService, LegalDetailsService } from "../services/FeatureServices.js";

export const FeaturesList = async (req, res) => {
  const result = await FeaturesListService(req);
  return res.status(200).json(result);
};

export const LegalDetails = async (req, res) => {
  const result = await LegalDetailsService(req);
  return res.status(200).json(result);
};
