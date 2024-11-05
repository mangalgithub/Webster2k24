import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DesignerDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleAddNewItem = () => {
    console.log("Add New Item clicked");
    navigate("/addProduct");
  };

  const fetchproducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/productD/getProducts",{
          withCredentials: true,
        }
      );
      //console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  // const products = [
  //   { _id: 1, productName: "Stylish T-Shirt", image: "https://dummyimage.com/200x200" },
  //   { _id: 2, productName: "Modern Jeans", image: "https://dummyimage.com/200x200" },
  //   { _id: 3, productName: "Elegant Dress", image: "https://dummyimage.com/200x200" },
  //   { _id: 4, productName: "Casual Jacket", image: "https://dummyimage.com/200x200" },
  // ];

  useEffect(() => {
    fetchproducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Designer Dashboard
      </h1>

      {/* Add New Item Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        onClick={handleAddNewItem}
      >
        Add New Item
      </motion.button>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4 w-full max-w-4xl">
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-700 mb-2">
                {product.productName}
              </h2>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
                >
                  Edit Product
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DesignerDashboard;
