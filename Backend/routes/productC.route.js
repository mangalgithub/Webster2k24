import express from "express";
import {
  showAllProducts,
  showProductById,
  searchProductByName,
  topFiveProducts,
  filterProducts,
  sortProducts,
} from "./../controllers/productC.controller.js";
const router = express.Router();

router.route("/showAllProducts").get(showAllProducts);
router.route("/showProductById/:productId").get(showProductById);
router.route("/searchProductByName").get(searchProductByName);
router.route("/topFiveProducts").get(topFiveProducts);
router.route("/filterProducts").get(filterProducts);
router.route("/sortProducts").get(sortProducts);

export default router;
