import React from "react";
import { motion } from "framer-motion";

const DesignerDashboard = () => {
  const products = [
    { id: 1, name: "Stylish T-Shirt", img: "https://dummyimage.com/200x200" },
    { id: 2, name: "Modern Jeans", img: "https://dummyimage.com/200x200" },
    { id: 3, name: "Elegant Dress", img: "https://dummyimage.com/200x200" },
    { id: 4, name: "Casual Jacket", img: "https://dummyimage.com/200x200" },
  ];

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
      >
        Add New Item
      </motion.button>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4 w-full max-w-4xl">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-700 mb-2">
                {product.name}
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
