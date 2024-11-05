import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/productC/showProductById/${id}`
      );
      //console.log(response.data.product);
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
const handleAddToCart = () => {
  //console.log("Product added to cart:", product);
  const response = axios.post(`http://localhost:5000/api/customer/addToCart`,{ productId: product._id },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  alert("Product added to cart!");

}
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.productName}
              </h1>
              <div className="flex mb-4">
                {/* Rating Section */}
                <span className="flex items-center">
                  {/* Rating SVGs omitted for brevity */}
                  <span className="text-gray-600 ml-3">
                    {product.reviews.length} reviews
                  </span>
                </span>
                {/* Social Media Links Section */}
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2">
                  {/* Icons omitted for brevity */}
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {/* Color and Size Selection */}
                {/* Omitted for brevity */}
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                ₹ {product.price}
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={handleAddToCart} >
                  Add To Cart
                </button>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Add to Wishlist
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  {/* Heart SVG omitted for brevity */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDescription;
