import { Product } from "../models/product.model.js";

// to get all the products created by a designer through his login details
export const getProductsDesigned = async (req, res) => {
  try {
    const id = req.id;
    //!idhar kuch to gadbad hai populate me
    const products = await Product.find({ designerId: id }).populate([
      { path: "reviews" },
      { path: "designerId" },
    ]);

    console.log(products);
    if (!products) {
      return res.status(400).json({
        message: "No products found",
        products,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Products fetched successfully",
      products,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// to add new product by a designer
export const addNewProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      price,
      image,
      size,
      category,
      theme,
      tags,
      sustainabilityBadge,
    } = req.body;

    if (
      !productName ||
      !description ||
      !price ||
      !category ||
      !theme ||
      !tags ||
      !sustainabilityBadge
    ) {
      return res.status(400).json({
        message: "Not all fields have been entered",
        success: false,
      });
    }

    const product = Product.create({
      productName,
      description,
      price,
      image,
      size: size.split(","),
      category,
      theme,
      tags,
      sustainabilityBadge,
      designerId: req.id,
    });

    return res.status(200).json({
      message: "Product created successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// to update product details by a designer(by taking its product id from params)
export const updateProduct = async (req, res) => {
  try {
    //assuming all the changes are being passed in req.body
    const id = req.params.id;
    const {
      productName,
      description,
      price,
      image,
      size,
      category,
      theme,
      tags,
      sustainabilityBadge,
    } = req.body;
    const body = {
      productName,
      description,
      price,
      image,
      size: size.split(","),
      category,
      theme,
      tags,
      sustainabilityBadge,
    };
    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!product) {
      return res.status(400).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product updated successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// to delete product by a designer
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
