import express from "express";
import {
  getCustomerDetails,
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
  decrementQuantity,
  addToWishlist,
  getWishlist,
  getNewWishlist,
  followDesigner,
  unfollowDesigner,
  markRead,
} from "../controllers/customer.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();
//routes related to user authentication and profile
router.route("/getCustomerDetails").get( isAuthenticated,getCustomerDetails);
router.route("/register").post(upload.single("profilePhoto"), registerCustomer);
router.route("/login").post(loginCustomer);
router.route("/logout").get(logoutCustomer);
router
  .route("/update")
  .post(isAuthenticated, upload.single("profilePhoto"), updateCustomerProfile);

//routes related to user cart
router.route("/addToCart").post(isAuthenticated, addToCart);
router.route("/removeFromCart").post(isAuthenticated, removeFromCart);
router.route("/getCartItems").get(isAuthenticated, getCartItems);
router.route("/myOrders").get(isAuthenticated, myOrders);
router.route("/cartToOrder").get(isAuthenticated, cartToOrder);
router.route("/clearCart").get(isAuthenticated, clearCart);
router.route("/decrementQuantity").get(isAuthenticated, decrementQuantity);

//routes related to user wishlist
router.route("/addToWishlist/:id").post(isAuthenticated, addToWishlist);
router.route("/getWishlist").get(isAuthenticated, getWishlist);
router.route("/getNewWishlist").get(isAuthenticated, getNewWishlist);
router.route("/markAsRead").put(isAuthenticated, markRead);

//routes related to following a designer
router.route("/follow/:id").post(isAuthenticated, followDesigner);
router.route("/unfollow/:id").delete(isAuthenticated, unfollowDesigner);
export default router;
