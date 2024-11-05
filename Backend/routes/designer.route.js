import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  loginDesigner,
  logoutDesigner,
  registerDesigner,
  updateDesignerProfile,
} from "../controllers/designer.controller.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();

router.route("/register").post(upload.single("profilePhoto"), registerDesigner);
router.route("/login").post(loginDesigner);
router.route("/logout").get(logoutDesigner);
router
  .route("/update")
  .post(isAuthenticated, upload.single("profilePhoto"), updateDesignerProfile);
export default router;
