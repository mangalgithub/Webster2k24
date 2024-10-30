import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import Fuse from "fuse.js";

export const showAllProducts = async (req, res) => {
  try {
    console.log("hello");
    const products = await Product.find();
    return res.status(200).json({ products, success: true });
  } catch (error){
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error.", success: false });
  }
};

export const showProductById = async (req, res) => {
  try {
    const { productId } = req.query;
    const product = await Product.findById(productId);
    return res.status(200).json({ product, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error.", success: false });
  }
};

export const filterProducts = async (req, res) => {
  try {
    const category = req.query.category.split(",");
    const min = req.query.minrange;
    const max = req.query.maxrange;
    const products = await Product.find({
      $and: [
        { category: { $in: category } },
        { price: { $gte: min, $lte: max } },
      ],
    });
    return res.status(200).json({ products, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const sortProducts = async (req, res) => {
  try {
    const sort = req.query.sort;
    if (sort == "asc") {
      const products = await Product.find().sort({ price: 1 });
      return res.status(200).json({ products, success: true });
    }
    if (sort == "desc") {
      const products = await Product.find().sort({ price: -1 });
      return res.status(200).json({ products, success: true });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const searchProductByName = async (req, res) => {
  try {
    const { keyword } = req.query;

    const products = await Product.find();

    const fuse = new Fuse(products, {
      keys: ["category", "theme", "productName", "tags"],
      threshold: 0.3, // Controls fuzziness; lower is stricter, higher is more lenient
    });

    const results = fuse.search(keyword).map((result) => result.item);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const topFiveProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(5);
    return res.status(200).json({ products, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const myOrders = async (req, res) =>{
  try{
    const userId = req.query.userId;
    const orders = await Order.find({ customerId: userId });
    return res.status(200).json({ orders, success: true });
  }
  catch (error){
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};








