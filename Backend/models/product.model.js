//schema for a product
import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    size: {
      enum: ["S", "M", "L", "XL", "XXL"],
      type: String,
    },
    category: {
      type: String,
      enum: [
        "Men's T-shirts & Polos",
        "Men's Shirts",
        "Men's Jeans & Trousers",
        "Men's Shorts",
        "Men's Kurtas & Ethnic Wear",
        "Men's Jackets & Blazers",
        "Men's Sleepwear",
        "Women's T-shirts",
        "Women's Shirts",
        "Women's Dresses",
        "Women's Tops & T-shirts",
        "Women's Kurtis & Tunics",
        "Women's Sarees",
        "Women's Suits & Sets",
        "Women's Jeans & Pants",
        "Women's Ethnic Wear",
        "Women's Jackets & Coats",
        "Women's Sleepwear",
        "Jewelry",
        "Watches",
        "Bags & Wallets",
        "Belts",
        "Scarves & Stoles",
        "Sunglasses",
      ],
    },
    theme: {
      type: String,
      enum: ["music", "tv shows", "sports", "movies"],
    },
    tags: [
      {
        type: String,
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: {
      type: Number,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    sustainabilityBadge: {
      type: Boolean,
      default: true,
    },
    designerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designer",
    },
  },
  {
    timestamps: true,
  }
);
export const Product = mongoose.model("Product", productSchema);
