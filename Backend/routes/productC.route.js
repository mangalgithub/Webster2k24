import express from "express";
import { showAllProducts, showProductById,searchProductByName } from './../controllers/productC.controller.js';
const router = express.Router();

router.route("/showAllProducts").get(showAllProducts);
router.route("/showProductById:productId").get(showProductById);
router.route("/searchProductByName").get(searchProductByName);
export default router;
