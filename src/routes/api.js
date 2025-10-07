import express from "express";
import AuthVerification from '../middlewares/AuthVerification.js';
import * as ProductController from "../controllers/ProductController.js";
import * as UserController from '../controllers/UserController.js';
import * as WishListController from '../controllers/WishListController.js';
import * as CartListController from "../controllers/CartListController.js";
import * as InvoiceController from "../controllers/InvoiceController.js";
import * as FeaturesController from "../controllers/FeaturesController.js";

const router = express.Router();


// product Routes
router.get('/ProductBrandList', ProductController.ProductBrandList);
router.get('/ProductCategoryList', ProductController.ProductCategoryList);
router.get('/ProductSliderList', ProductController.ProductSliderList);
router.get('/ProductListByBrand/:BrandID', ProductController.ProductListByBrand);
router.get('/ProductListByCategory/:CategoryID', ProductController.ProductListByCategory);
router.get('/ProductBySimilar/:CategoryID', ProductController.ProductBySimilar);
router.get('/ProductListByKeyword/:Keyword', ProductController.ProductListByKeyword);
router.get('/ProductListByRemark/:Remark', ProductController.ProductListByRemark);
router.get('/ProductDetails/:ProductID', ProductController.ProductDetails);

// user Routes
router.get('/UserOTP/:email', UserController.UserOTP);
router.get('/VerifyLogin/:email/:otp', UserController.VerifyLogin);
router.get('/UserLogout', AuthVerification, UserController.UserLogout);
router.post('/CreateProfile', AuthVerification, UserController.CreateProfile);
router.post('/UpdateProfile', AuthVerification, UserController.UpdateProfile);
router.get('/ReadProfile', AuthVerification, UserController.ReadProfile);


// Wish Routes
router.post('/SaveWishList', AuthVerification, WishListController.SaveWishList);
router.post('/RemoveWishList', AuthVerification, WishListController.RemoveWishList);
router.get('/WishList', AuthVerification, WishListController.WishList);


// Cart
router.post("/SaveCartList", AuthVerification, CartListController.SaveCartList);
router.post("/UpdateCartList/:cartID", AuthVerification, CartListController.UpdateCartList);
router.delete("/RemoveCartList", AuthVerification, CartListController.RemoveCartList);
router.get("/CartList", AuthVerification, CartListController.CartList);


// Invoice & Payment
router.get('/CreateInvoice',AuthVerification,InvoiceController.CreateInvoice);
router.get('/InvoiceList',AuthVerification,InvoiceController.InvoiceList);
router.get('/InvoiceProductList/:invoice_id',AuthVerification,InvoiceController.InvoiceProductList);


router.post('/PaymentSuccess/:trxID',InvoiceController.PaymentSuccess);
router.post('/PaymentCancel/:trxID',InvoiceController.PaymentCancel);
router.post('/PaymentFail/:trxID',InvoiceController.PaymentFail);
router.post('/PaymentIPN/:trxID',InvoiceController.PaymentIPN);

// Features
router.get("/FeaturesList", FeaturesController.FeaturesList);
router.get("/LegalDetails/:type", FeaturesController.LegalDetails);

// Create Review from ProductController
router.post('/ProductCreateReview',AuthVerification,ProductController.ProductCreateReview)
router.get('/ProductReviewList/:ProductID',AuthVerification, ProductController.ProductReviewList);


export default router;
