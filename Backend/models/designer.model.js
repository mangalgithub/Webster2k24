//schema for sellers(designers)
import mongoose from "mongoose";
const designerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: number,
      required: true,
    },
    rating: {
      type: mongoose.Types.Decimal128,
    },
    address: {
      store_name: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
    ],
  },
  { timestamps: true }
);
export const Designer = mongoose.model("Designer", designerSchema);
