import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  loginDesigner,
  logoutDesigner,
  registerDesigner,
  updateDesignerProfile,
} from "../controllers/designer.controller.js";
const router = express.Router();

router.route("/register").post(registerDesigner);
router.route("/login").post(loginDesigner);
router.route("/logout").get(logoutDesigner);
router.route("/update").post(isAuthenticated, updateDesignerProfile);
export default router;
