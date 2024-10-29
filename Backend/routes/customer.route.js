import express from "express";
import {
  loginCustomer,
  logoutCustomer,
  registerCustomer,
  updateCustomerProfile,
} from "../controllers/customer.controller";
import isAuthenticated from "../middleware/isAuthenticated";
const router = express.Router();

router.route("/register").post(registerCustomer);
router.route("/login").post(loginCustomer);
router.route("/logout").get(logoutCustomer);
router.route("/update").post(isAuthenticated, updateCustomerProfile);
export default router;
