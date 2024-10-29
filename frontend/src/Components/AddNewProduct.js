import React, { useState } from "react";
import { motion } from "framer-motion";

const AddNewProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    sizes: [],
    price: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSizeChange = (size) => {
    setProductData((prevData) => ({
      ...prevData,
      sizes: prevData.sizes.includes(size)
        ? prevData.sizes.filter((s) => s !== size)
        : [...prevData.sizes, size],
    }));
  };

  const handleSubmit = () => {
    // Add logic to handle product submission
    alert("Product added successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <label className="block mb-2 text-gray-600 font-semibold">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Enter product name"
        />

        <label className="block mb-2 text-gray-600 font-semibold">
          Description
        </label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Enter product description"
          rows="3"
        />

        <label className="block mb-2 text-gray-600 font-semibold">
          Sizes Available
        </label>
        <div className="flex gap-2 mb-4">
          {["S", "M", "L", "XL"].map((size) => (
            <label key={size} className="flex items-center">
              <input
                type="checkbox"
                checked={productData.sizes.includes(size)}
                onChange={() => handleSizeChange(size)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">{size}</span>
            </label>
          ))}
        </div>

        <label className="block mb-2 text-gray-600 font-semibold">
          Price ($)
        </label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Enter price"
        />

        <label className="block mb-2 text-gray-600 font-semibold">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded-lg mb-6 focus:outline-none focus:border-blue-500"
        />

        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-200"
        >
          Add Product
        </motion.button>
      </div>
    </div>
  );
};

export default AddNewProduct;
