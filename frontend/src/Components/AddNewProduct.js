import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const AddNewProduct = () => {
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    size: [],
    price: "",
    image: null,
    category: "",
    theme: "",
    tags: [],
    sustainabilityBadge: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setProductData({
      ...productData,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSizeChange = (size) => {
    setProductData((prevData) => ({
      ...prevData,
      size: prevData.size.includes(size)
        ? prevData.size.filter((s) => s !== size)
        : [...prevData.size, size],
    }));
  };

  const handleTagChange = (e) => {
    setProductData({ ...productData, tags: e.target.value.split(",") });
  };

  const handleSubmit = async() => {
    console.log("Product data submitted:", productData);

    const formData = new FormData();
      formData.append("productName",productData.productName);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("size", productData.size);
      formData.append("category", productData.category);
      formData.append("theme", productData.theme);
      formData.append("tags", productData.tags);
      formData.append("sustainabilityBadge", productData.sustainabilityBadge);
      if (productData.image) formData.append("image", productData.image);

      const response= await axios.post("http://localhost:5000/api/productD/add", formData,{
        withCredentials: true
      });
        console.log(response.data);
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
          name="productName"
          value={productData.productName}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Organic Cotton T-Shirt"
        />

        <label className="block mb-2 text-gray-600 font-semibold">
          Description
        </label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          placeholder="A soft, breathable t-shirt made from 100% organic cotton. Perfect for casual wear, eco-friendly, and sustainably sourced."
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
                checked={productData.size.includes(size)}
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
          placeholder="29.99"
        />

        <label className="block mb-2 text-gray-600 font-semibold">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Men's T-shirts & Polos"
        />

        <label className="block mb-2 text-gray-600 font-semibold">Theme</label>
        <input
          type="text"
          name="theme"
          value={productData.theme}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          placeholder="music"
        />

        <label className="block mb-2 text-gray-600 font-semibold">Tags</label>
        <input
          type="text"
          name="tags"
          value={productData.tags.join(", ")}
          onChange={handleTagChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          placeholder="organic, eco-friendly, cotton, summer, unisex"
        />

        <label className="block mb-2 text-gray-600 font-semibold">
          Sustainability Badge
        </label>
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={productData.sustainabilityBadge}
            onChange={() =>
              setProductData((prev) => ({
                ...prev,
                sustainabilityBadge: !prev.sustainabilityBadge,
              }))
            }
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Show Sustainability Badge</span>
        </label>

        <label className="block mb-2 text-gray-600 font-semibold">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded-lg mb-6 focus:outline-none focus:border-blue-500"
        />

        {productData.image && (
          <img
            src={
              typeof productData.image === "string"
                ? productData.image
                : URL.createObjectURL(productData.image)
            }
            alt="Product Preview"
            className="w-full h-48 object-cover rounded-lg mb-6"
          />
        )}

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
