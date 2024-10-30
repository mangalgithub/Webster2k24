import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  addNewProduct,
  deleteProduct,
  getProductsDesigned,
  updateProduct,
} from "../controllers/productD.controller.js";

const router = express.Router();
router.route("/getProducts").get(isAuthenticated, getProductsDesigned);
router.route("/add").post(isAuthenticated, addNewProduct);
router.route("/update/:id").put(isAuthenticated, updateProduct);
router.route("/remove/:id").delete(isAuthenticated, deleteProduct);

export default router;