import React, { useState } from "react";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Men's T-shirt", price: 500, quantity: 2 },
    { id: 2, name: "Women's Jeans", price: 800, quantity: 1 },
    { id: 3, name: "Watch", price: 1200, quantity: 1 },
  ]);

  // Simulate backend API call to remove an item
  const removeItemFromBackend = async (id) => {
    try {
      // Placeholder for backend API call
      // Example: await fetch(`/api/cart/${id}`, { method: 'DELETE' });
      console.log(`Removing item with ID: ${id} from backend`);
      return true; // Simulate success response
    } catch (error) {
      console.error("Failed to remove item:", error);
      return false;
    }
  };

  // Function to remove an item from cart
  const removeItem = async (id) => {
    const success = await removeItemFromBackend(id);
    if (success) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  // Function to increase the quantity of a product
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease the quantity of a product
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Function to calculate the total price of all products
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Function to handle placing an order
  const placeOrder = () => {
    alert("Order placed successfully!");
    clearCart();
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">My Cart</h2>

      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-500">Price: ₹{item.price}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
                >
                  -
                </button>
                <span className="text-lg font-semibold text-gray-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-3 py-1 ml-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <div className="flex justify-between items-center py-4 mt-4 border-t">
            <h3 className="text-xl font-semibold text-gray-800">
              Total Price:
            </h3>
            <p className="text-xl font-bold text-green-600">
              ₹{calculateTotalPrice()}
            </p>
          </div>

          {/* Clear Cart and Place Order Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button
              onClick={placeOrder}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
      )}
    </div>
  );
};

export default MyCart;
