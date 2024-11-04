import React, { useState } from "react";
import axios from "axios";


const ProfileUpdate = () => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    phoneNumber: "",
    houseNo: "",
    street: "",
    area: "",
    city: "",
    profilePhoto: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setProfileData({
      ...profileData,
      profilePhoto: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(profileData);

    // Send the updated profile data to the backend
    
    const formData = new FormData();
      formData.append("fullName",profileData.fullName);
      formData.append("phoneNumber", profileData.phoneNumber);
      formData.append("houseNo", profileData.houseNo);
      formData.append("street", profileData.street);
      formData.append("area", profileData.area);
      formData.append("city", profileData.city);
      if (profileData.profilePhoto) formData.append("profilePhoto", profileData.profilePhoto);

      const response= await axios.post("http://localhost:5000/api/customer/update", formData,{
        withCredentials: true
      });
        console.log(response.data);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Update Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-medium">Name</label>
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-medium">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-medium">House Number</label>
          <input
            type="text"
            name="houseNo"
            value={profileData.houseNo}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-medium">Street</label>
          <input
            type="text"
            name="street"
            value={profileData.street}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-medium">Area</label>
          <input
            type="text"
            name="area"
            value={profileData.area}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-medium">City</label>
          <input
            type="text"
            name="city"
            value={profileData.city}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-medium">
            Profile Photo
          </label>
          <input
            type="file"
            onChange={handlePhotoChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          {profileData.profilePhoto && (
            <img
              src={profileData.profilePhoto}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full mt-4 mx-auto object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
