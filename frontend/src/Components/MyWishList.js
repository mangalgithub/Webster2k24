import React from "react";

const MyWishList = () => {
  const wishlistItems = [
    {
      id: "1",
      name: "Smartphone",
      description: "Latest model with advanced features",
      price: "$699",
      image: "https://dummyimage.com/400x400",
    },
    {
      id: "2",
      name: "Headphones",
      description: "Noise-cancelling, wireless",
      price: "$199",
      image: "https://dummyimage.com/400x400",
    },
    {
      id: "3",
      name: "Gaming Console",
      description: "Play the latest games with stunning graphics",
      price: "$499",
      image: "https://dummyimage.com/400x400",
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              {item.name}
            </h3>
            <p className="text-gray-600 mb-1">{item.description}</p>
            <p className="text-gray-800 font-semibold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWishList;
