import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";

//to add a new review by a customer at the my orders page to a product
//this will be only accessible to the customer and that to at the myorders page
export const addNewReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    if (!rating || !comment) {
      return res.status(400).json({
        message: "Both Rating and comment are required",
        success: false,
      });
    }

    //ensuring that the customer has not already reviewed the product
    const oldReview = await Review.findOne({
      productId,
      customerId: req.id,
    });
    if (oldReview) {
      return res.status(400).json({
        message: "You have already reviewed this product",
        success: false,
      });
    }
    const review = await Review.create({
      rating,
      comment,
      customerId: req.id,
      productId,
    });

    //this will add the review to the product and also save it
    const product = await Product.findById(productId).populate("reviews");
    const NoOfReviews = product.reviews.length;
    product.reviews.push(review._id);

    product.rating =
      (rating + product.rating * NoOfReviews) / (NoOfReviews + 1);

    await product.save();

    return res.status(201).json({
      message: "Review added successfully",
      success: true,
      review,
      product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//to get all reviews of a product(by product id from params)
export const getAllReviews = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviews = await Review.find({ productId });

    if (!reviews) {
      return res.status(404).json({
        message: "No reviews found",
        success: false,
      });
    }
    if (reviews.length === 0) {
      return res.status(200).json({
        message: "No reviews found",
        success: true,
        reviews,
      });
    }
    return res.status(200).json({
      message: "Reviews fetched successfully",
      success: true,
      reviews,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//to delete a review by a customer at the my orders page(ensuring that the review belongs to the customer in the frontend)
export const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Review deleted successfully",
      success: true,
      review,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
