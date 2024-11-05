import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupBackground from "../assests/images/loginBackground.jpg";
import axios from "axios";
const SignUpPageSeller = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [storeName, setStoreName] = useState("");
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure formData is initialized at the beginning
      const formData = new FormData();

      // Append fields in the correct order
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phoneNumber", phoneNumber);
      formData.append("storeName", storeName);
      formData.append("street", street);
      formData.append("area", area);
      formData.append("city", city);
      if (photo) formData.append("profilePhoto", photo); // Conditionally add profile photo

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Sending the formData with axios
      const response = await axios.post(
        "http://localhost:5000/api/designer/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data); // Log successful response data
      navigate("/seller/login");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      } else {
        console.log("An error occurred. Please try again.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${signupBackground})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Form container */}
      <div className="relative z-10 max-w-md mx-auto p-12 bg-white bg-opacity-80 rounded-lg shadow-lg backdrop-blur-lg">
        <form className="space-y-2" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center text-gray-700">
            Sign Up
          </h1>

          {/* Full Name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="fullname"
              id="fullname"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label
              htmlFor="fullname"
              className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
          </div>

          {/* Email */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          {/* Phone Number */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number
            </label>
          </div>

          {/* Address - House No, Street, Area, City */}
          <div className="space-y-5">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="storeName"
                id="storeName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
              <label
                htmlFor="storeName"
                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Store Name
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="street"
                id="street"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <label
                htmlFor="street"
                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Street
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="area"
                id="area"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
              <label
                htmlFor="area"
                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Area
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label
                htmlFor="city"
                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City
              </label>
            </div>
          </div>

          {/* Profile Photo Upload */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="file"
              name="profilePhoto"
              id="profilePhoto"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => {
                const file = e.target.files[0];
                setPhoto(file);
              }}
            />
            <label htmlFor="profilePhoto" className="text-sm text-gray-500">
              Upload Profile Photo
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign Up
          </button>
          {/* Link to Signup Page */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Already SignedUp?{" "}
            <Link to="/seller/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUpPageSeller;
