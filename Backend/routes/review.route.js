import express from "express";
import {
  addNewReview,
  deleteReview,
  getAllReviews,
} from "../controllers/review.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();
router.route("/add/:id").post(isAuthenticated, addNewReview);
router.route("/get/:id").get(isAuthenticated, getAllReviews);
router.route("/remove/:id").delete(isAuthenticated, deleteReview);

export default router;
