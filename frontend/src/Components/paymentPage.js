import React, { useState } from "react";

const PaymentPage = () => {
  const [quantity, setQuantity] = useState(1);
  const pricePerUnit = 20; 

  // Calculate total price
  const totalPrice = pricePerUnit * quantity;

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrease quantity with minimum limit of 1
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
        <div className="flex justify-center mb-4">
          <img
            src="https://dummyimage.com/200x200" 
            alt="Product"
            className="w-40 h-40 object-cover rounded"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Product Name
        </h2>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={decreaseQuantity}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
        <div className="text-center mb-4">
          <p className="text-gray-600">Total Price:</p>
          <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex justify-around mt-6">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
            Cash on Delivery
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Online Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
