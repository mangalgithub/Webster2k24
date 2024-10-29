import React from "react";
import loginBackground from "../assests/images/loginBackground.jpg";

const BuyerDashboard = () => {
  return (
    <div className="flex">
    
      <div className="flex-grow p-4">
      
        <div
          className="relative w-full mb-8"
          id="default-carousel"
          data-carousel="slide"
        >
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
           
            {[...Array(5)].map((_, idx) => (
              <div
                className="duration-700 ease-in-out"
                data-carousel-item
                key={idx}
              >
                <img
                  src={loginBackground}
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt={`Slide ${idx + 1}`}
                />
              </div>
            ))}
          </div>
       
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
            data-carousel-prev
          >
            {/* Add SVG for left arrow */}
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
            data-carousel-next
          >
            {/* Add SVG for right arrow */}
          </button>
        </div>

        {/* Product Listing Section */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={`https://dummyimage.com/42${idx}x26${idx}`}
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      CATEGORY
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      Product {idx + 1}
                    </h2>
                    <p className="mt-1">${(15 + idx).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Filter Section */}
      <div className="w-64 p-4 bg-gray-100 border-l border-gray-300">
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          Filter Options
        </h2>

        {/* Theme Filter */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-600 mb-2">Theme</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Electronics
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Fashion & Apparel
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Groceries
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Home Decor
            </label>
          </div>
        </div>

        {/* Tag Filter */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-600 mb-2">Tags</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              New Arrivals
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Best Sellers
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Discounted
            </label>
          </div>
        </div>

        {/* Filter Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
          Filter
        </button>
      </div>
    </div>
  );
};

export default BuyerDashboard;
