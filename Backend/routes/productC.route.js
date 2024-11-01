import express from "express";
import { showAllProducts, showProductById,searchProductByName,topFiveProducts } from './../controllers/productC.controller.js';
const router = express.Router();

router.route("/showAllProducts").get(showAllProducts);
router.route("/showProductById:productId").get(showProductById);
router.route("/searchProductByName").get(searchProductByName);
router.route("/topFiveProducts").get(topFiveProducts);
export default router;
