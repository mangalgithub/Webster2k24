import React from "react";
import { useNavigate } from "react-router-dom";
import mainBackground from "../assests/images/loginBackground.jpg"; // Adjust path as needed

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${mainBackground})`,
      }}
    >
      {/* Overlay for darkening background image */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Centered Button Container */}
      <div className="relative z-10 flex flex-col items-center space-y-8 p-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-8 animate-bounce">
          Welcome To Trendy F!
        </h1>

        {/* Button Container with horizontal alignment and gap */}
        <div className="flex space-x-8">
          {/* Buyer Button */}
          <button
            onClick={() => navigate("/buyer/login")} // Navigate to Buyer Login
            className="relative text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full text-2xl w-40 h-40 flex items-center justify-center transition-transform transform-gpu hover:scale-110 animate-pulse shadow-lg"
          >
            Buyer
          </button>

          {/* Designer Button */}
          <button
            onClick={() => navigate("/seller/login")} // Navigate to Designer Login
            className="relative text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-full text-2xl w-40 h-40 flex items-center justify-center transition-transform transform-gpu hover:scale-110 animate-pulse shadow-lg"
          >
            Designer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
