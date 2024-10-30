import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 1.0 && value <= 5.0;
        },
        message: "Rating must be between 1.0 and 5.0.",
      },
    },
    comment: {
      type: String,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);
export const Review = mongoose.model("Review", reviewSchema);
