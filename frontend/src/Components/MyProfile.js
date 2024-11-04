import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const MyProfile = () => {
  const navigate =useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    phoneNumber: "+1 (555) 123-4567",
    houseNumber: "123",
    street: "Maple Street",
    area: "Downtown",
    city: "Metropolis",
  });

  const handleEditClick = () => {
    // setIsEditing(true);
      navigate('/profile_update');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Here, you can add a function to save updated data to a database if needed.
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 font-sans">
      <h2 className="text-center text-2xl font-bold text-gray-800">
        My Profile
      </h2>

      {isEditing ? (
        <>
          <div className="text-gray-700">
            <label className="block text-sm font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="text-gray-700">
            <label className="block text-sm font-medium">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="text-gray-700">
            <label className="block text-sm font-medium">House Number:</label>
            <input
              type="text"
              name="houseNumber"
              value={profileData.houseNumber}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="text-gray-700">
            <label className="block text-sm font-medium">Street:</label>
            <input
              type="text"
              name="street"
              value={profileData.street}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="text-gray-700">
            <label className="block text-sm font-medium">Area:</label>
            <input
              type="text"
              name="area"
              value={profileData.area}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="text-gray-700">
            <label className="block text-sm font-medium">City:</label>
            <input
              type="text"
              name="city"
              value={profileData.city}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-gray-700">
            <strong>Name:</strong> {profileData.name}
          </div>
          <div className="text-gray-700">
            <strong>Phone Number:</strong> {profileData.phoneNumber}
          </div>
          <div className="text-gray-700">
            <strong>House Number:</strong> {profileData.houseNumber}
          </div>
          <div className="text-gray-700">
            <strong>Street:</strong> {profileData.street}
          </div>
          <div className="text-gray-700">
            <strong>Area:</strong> {profileData.area}
          </div>
          <div className="text-gray-700">
            <strong>City:</strong> {profileData.city}
          </div>
          <button
            onClick={handleEditClick}
            className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default MyProfile;
