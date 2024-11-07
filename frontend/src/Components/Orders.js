import React,{useState,useEffect} from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  // const orders = [
  //   {
  //     id: "12345",
  //     date: "2024-10-25",
  //     status: "Shipped",
  //     tracking: "In Transit",
  //     image: "https://dummyimage.com/400x400",
  //   },
  //   {
  //     id: "67890",
  //     date: "2024-10-20",
  //     status: "Delivered",
  //     tracking: "Delivered on 2024-10-23",
  //     image: "https://dummyimage.com/400x400",
  //   },
  //   {
  //     id: "11223",
  //     date: "2024-10-10",
  //     status: "Processing",
  //     tracking: "Preparing for Shipment",
  //     image: "https://dummyimage.com/400x400",
  //   },
  // ];
const fetchOrders = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/customer/myOrders", {
      withCredentials: true,
    })
    console.log(response.data.orders);
    setOrders(response.data.orders);
  }
  catch (error) {
    console.log(error);
  }
}
  useEffect(() => {
     fetchOrders();
  }, []);
const getDate = (date) => {
const newdate = new Date(date);

const day = newdate.getDate();
const month = newdate.toLocaleString('default', { month: 'short' });
const year = newdate.getFullYear();

const formattedDate = `${day} ${month} ${year}`;
return formattedDate;
//console.log(formattedDate);

}
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
          >
            <img
              src={order.orderItems[0].productId.image}
              alt={`Order ${order._id}`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              Order #{order._id}
            </h3>
            {/* {order.orderItems.map((item) => (
              <p key={item.productId._id} className="text-gray-600 mb-1">
                {item.productId.productName} - {item.quantity}
              </p>
            ))} */}
            <div className="order-amount-container bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-sm mx-auto text-center">
  <h2 className="text-gray-700 text-lg font-semibold mb-2">Order Summary</h2>
  <p className="text-gray-500 text-sm mb-1">Order Amount:</p>
  <p className="text-green-600 text-2xl font-bold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(order.totalAmount)}</p>
</div>

<div className="order-info-container bg-white p-5 rounded-lg shadow-md w-full max-w-md mx-auto">

  <div className="flex justify-between mb-2">
    <span className="text-gray-500 font-medium">Date:</span>
    <span className="text-gray-700">{getDate(order.createdAt)}</span>
  </div>

  <div className="flex justify-between mb-2">
    <span className="text-gray-500 font-medium">Status:</span>
    <span className={`font-bold ${order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>
      {order.status}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="text-gray-500 font-medium">Tracking:</span>
    <span className="text-blue-600">{order.tracking}</span>
  </div>
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
