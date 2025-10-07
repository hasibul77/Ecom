// src/controllers/ProductController.js
import { 
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySimilarService,
    ListByKeywordService,
    ListByRemarkService,
    DetailsService,
    ReviewListService,
    CreateReviewService,
    ListByFilterService
} from '../services/ProductServices.js';

// ------------------- Brand / Category / Slider -------------------
export const ProductBrandList = async (req, res) => {
    const result = await BrandListService();
    return res.status(200).json(result);
};

export const ProductCategoryList = async (req, res) => {
    const result = await CategoryListService();
    return res.status(200).json(result);
};

export const ProductSliderList = async (req, res) => {
    const result = await SliderListService();
    return res.status(200).json(result);
};

// ------------------- Products by Brand -------------------
export const ProductListByBrand = async (req, res) => {
    const result = await ListByBrandService(req);
    return res.status(200).json(result);
};

// ------------------- Products by Category -------------------
export const ProductListByCategory = async (req, res) => {
    const result = await ListByCategoryService(req);
    return res.status(200).json(result);
};

// ------------------- Similar Products -------------------
export const ProductBySimilar = async (req, res) => {
    const result = await ListBySimilarService(req);
    return res.status(200).json(result);
};

// ------------------- Products by Keyword -------------------
export const ProductListByKeyword = async (req, res) => {
    const result = await ListByKeywordService(req);
    return res.status(200).json(result);
};

// ------------------- Products by Remark -------------------
export const ProductListByRemark = async (req, res) => {
    const result = await ListByRemarkService(req);
    return res.status(200).json(result);
};

// ------------------- Product Details -------------------
export const ProductDetails = async (req, res) => {
    const result = await DetailsService(req);
    return res.status(200).json(result);
};

// ------------------- Product Reviews -------------------
export const ProductReviewList = async (req, res) => {
    const result = await ReviewListService(req);
    return res.status(200).json(result);
};

export const ProductCreateReview = async (req, res) => {
    const result = await CreateReviewService(req);
    return res.status(200).json(result);
};

// ------------------- Products by Filter -------------------
export const ProductListByFilter = async (req, res) => {
    const result = await ListByFilterService(req);
    return res.status(200).json(result);
};
