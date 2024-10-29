import React from "react";

const Orders = () => {
  const orders = [
    {
      id: "12345",
      date: "2024-10-25",
      status: "Shipped",
      tracking: "In Transit",
      image: "https://dummyimage.com/400x400",
    },
    {
      id: "67890",
      date: "2024-10-20",
      status: "Delivered",
      tracking: "Delivered on 2024-10-23",
      image: "https://dummyimage.com/400x400",
    },
    {
      id: "11223",
      date: "2024-10-10",
      status: "Processing",
      tracking: "Preparing for Shipment",
      image: "https://dummyimage.com/400x400",
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
          >
            <img
              src={order.image}
              alt={`Order ${order.id}`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              Order #{order.id}
            </h3>
            <p className="text-gray-600 mb-1">Date: {order.date}</p>
            <p className="text-gray-600 mb-1">Status: {order.status}</p>
            <p className="text-gray-600">Tracking: {order.tracking}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
