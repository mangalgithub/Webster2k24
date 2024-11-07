import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileUpdate = () => {
  // const [profileData, setProfileData] = useState({
  // fullName: "",
  // phoneNumber: "",
  // houseNo: "",
  // street: "",
  // area: "",
  // city: "",
  // profilePhoto: null,
  // });
  const [fullName, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [pic, setPic] = useState(null);
  const fetchProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customer/getCustomerDetails",
        {withCredentials: true}
      );
       const data=response.data.customer;
       //console.log(data);
      setName(data.fullName);
      setPhoneNumber(data.phoneNumber);
      setHouseNo(data.address.houseNo);
      setStreet(data.address.street);
      setArea(data.address.area);
      setCity(data.address.city);
    } catch (error) {
      console.log(error);
    }   
  }
useEffect(() => {
  fetchProfileData();
},[]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProfileData({ ...profileData, [name]: value });
  // };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPic(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the updated profile data to the backend
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("phoneNumber", phoneNumber);
      formData.append("houseNo", houseNo);
      formData.append("street", street);
      formData.append("area", area);
      formData.append("city", city);
      if (pic) formData.append("profilePhoto", pic);

      const response = await axios.post(
        "http://localhost:5000/api/customer/update",
        formData,
        {
          withCredentials: true,
        }
      );

      //console.log(response.data);
      alert("Profile Updated Successfully!");
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
            value={fullName}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-medium">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-medium">House Number</label>
          <input
            type="text"
            name="houseNo"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-medium">Street</label>
          <input
            type="text"
            name="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-medium">Area</label>
          <input
            type="text"
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-600 font-medium">City</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
          {pic && (
            <img
              src={pic}
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
