import express from "express";
import {
  loginCustomer,
  logoutCustomer,
  registerCustomer,
  updateCustomerProfile,
  addToCart,
  removeFromCart,
  getCartItems,
  myOrders,
  cartToOrder,
  clearCart,
  decrementQuantity
} from "../controllers/customer.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();
<<<<<<< Updated upstream
router.route("/register").post(registerCustomer);
router.route("/login").post(loginCustomer);
router.route("/logout").get(logoutCustomer);
router.route("/update").post(isAuthenticated, updateCustomerProfile);
router.route("/addToCart").post(isAuthenticated, addToCart);
router.route("/removeFromCart").post(isAuthenticated, removeFromCart);
router.route("/getCartItems").get(isAuthenticated, getCartItems);
router.route("/myOrders").get(isAuthenticated,myOrders);
router.route("/cartToOrder").get(isAuthenticated,cartToOrder);
router.route("/clearCart").get(isAuthenticated,clearCart);
router.route("/decrementQuantity").get(isAuthenticated,decrementQuantity);

=======

router.route("/register").post(upload.single("profilePhoto"), registerCustomer);
router.route("/login").post(loginCustomer);
router.route("/logout").get(logoutCustomer);
router
  .route("/update")
  .post(isAuthenticated, upload.single("profilePhoto"), updateCustomerProfile);
>>>>>>> Stashed changes
export default router;
