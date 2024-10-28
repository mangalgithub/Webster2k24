import React from "react";
import { Link } from "react-router-dom";
import signupBackground from "../assests/images/loginBackground.jpg";
const SignUpPageSeller = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${signupBackground})`,
      }}
    >
      {/* Overlay for darkening background image */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Form container */}
      <div className="relative z-10 max-w-md mx-auto p-12 bg-white bg-opacity-80 rounded-lg shadow-lg backdrop-blur-lg">
        <form className="space-y-2">
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
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
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
                name="houseNo"
                id="houseNo"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="houseNo"
                className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:font-medium peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                House No
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
