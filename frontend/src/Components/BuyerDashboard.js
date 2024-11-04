import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loginBackground from "../assests/images/loginBackground.jpg";
import carousel1 from "../assests/images/carousel1.webp";
import carousel2 from "../assests/images/carousel2.webp";
import axios from "axios";
import calendarWeeksTemplate from './../../node_modules/flowbite-datepicker/js/picker/templates/calendarWeeksTemplate';
const BuyerDashboard = () => {
   const [carouselImages, setCarouselImages] = useState([]);
   const [products, setProducts] = useState([]);
  const fetchTopFiveProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/productC/topFiveProducts");
      console.log(response.data);
      const tempImages = response.data.products.map((product) => product.image);
      //console.log(tempImages);
      setCarouselImages(tempImages); 
    } catch (error) {
      console.error("Error fetching top five products:", error);
    }
  };

  

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/productC/showAllProducts");
      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error){
      console.error("Error fetching products:", error);
    }
  }
  useEffect(() => {
    fetchTopFiveProducts();
    fetchProducts();
  }, []);
  // Dummy data for carousel images
  // const carouselImages = [
  //    loginBackground,
  //    carousel1,
  //    loginBackground,
  //    carousel2,
  //   loginBackground,
  // ];

  // State for the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  // Dummy data for product listing
  // const products = [
  //   {
  //     id: 1,
  //     category: "Electronics",
  //     name: "Product 1",
  //     price: 15.99,
  //     image: "https://dummyimage.com/421x261",
  //   },
  //   {
  //     id: 2,
  //     category: "Fashion & Apparel",
  //     name: "Product 2",
  //     price: 16.99,
  //     image: "https://dummyimage.com/422x262",
  //   },
  //   {
  //     id: 3,
  //     category: "Groceries",
  //     name: "Product 3",
  //     price: 17.99,
  //     image: "https://dummyimage.com/423x263",
  //   },
  //   {
  //     id: 4,
  //     category: "Home Decor",
  //     name: "Product 4",
  //     price: 18.99,
  //     image: "https://dummyimage.com/424x264",
  //   },
  //   {
  //     id: 5,
  //     category: "Electronics",
  //     name: "Product 5",
  //     price: 19.99,
  //     image: "https://dummyimage.com/425x265",
  //   },
  //   {
  //     id: 6,
  //     category: "Fashion & Apparel",
  //     name: "Product 6",
  //     price: 20.99,
  //     image: "https://dummyimage.com/426x266",
  //   },
  //   {
  //     id: 7,
  //     category: "Groceries",
  //     name: "Product 7",
  //     price: 21.99,
  //     image: "https://dummyimage.com/427x267",
  //   },
  //   {
  //     id: 8,
  //     category: "Home Decor",
  //     name: "Product 8",
  //     price: 22.99,
  //     image: "https://dummyimage.com/428x268",
  //   },
  // ];

  return (
    <div className="flex">
      <div className="flex-grow p-4">
        {/* Carousel Section */}
        <div
          className="relative w-full mb-8"
          id="default-carousel"
          data-carousel="slide"
        >
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {carouselImages.map((image, idx) => (
              <div
                key={idx}
                className={`duration-700 ease-in-out ${
                  idx === currentSlide ? "block" : "hidden"
                }`}
              >
                <img
                  src={image}
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt={`Slide ${idx + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
          >
            <svg
              className="w-6 h-6 text-white hover:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
          >
            <svg
              className="w-6 h-6 text-white hover:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>

        {/* search button */}
        <div className="flex justify-end">
          <form className="w-64">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Product Listing Section */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {products.map((product) => (
                <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <a className="block relative h-48 rounded overflow-hidden">
                    <Link
                      to={`/product/${product._id}`}
                      className="block relative h-48 rounded overflow-hidden"
                    >
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src={product.image}
                      />
                    </Link>
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {product.category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {product.productName}
                    </h2>
                    <p className="mt-1">₹{product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Filter Section */}
      {/* Filter Section */}
      <div className="w-64 p-4 bg-gray-100 border-l border-gray-300">
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          Filter Options
        </h2>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-600 mb-2">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Men's T-shirts & Polos
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Men's Shirts
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Men's Jeans & Trousers
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Men's Shorts
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Men's Kurtas & Ethnic Wear
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Men's Jackets & Blazers
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Men's Sleepwear
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Women's T-shirts
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Women's Shirts
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Women's Dresses
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Women's Tops & T-shirts
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Women's Kurtis & Tunics
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Women's Sarees
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Women's Suits & Sets
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Women's Jeans & Pants
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Women's Ethnic Wear
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Women's Jackets & Coats
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Women's Sleepwear
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Jewelry
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Watches
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Bags & Wallets
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Belts
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Scarves & Stoles
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Sunglasses
            </label>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-600 mb-2">
            Price Range
          </h3>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="From"
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="To"
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
            Apply Price Range
          </button>
        </div>

        {/* Sort Option */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-600 mb-2">Sort By</h3>
          <select className="w-full p-2 border border-gray-300 rounded-md">
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
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
