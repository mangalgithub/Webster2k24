import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileSvg from "../assests/images/profileSvg.svg";
const MyProfile = () => {
  const navigate =useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // name: "John Doe",
    // phoneNumber: "+1 (555) 123-4567",
    // houseNumber: "123",
    // street: "Maple Street",
    // area: "Downtown",
    // city: "Metropolis",
  });
  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/customer/getCustomerDetails", {
        withCredentials: true
      });
      console.log(response.data.customer);
      setProfileData(response.data.customer);
    } catch (error){
      console.error("Error fetching customer details:", error);
    }
  };
      
  useEffect(() => {
    fetchCustomerDetails();
  }, []);
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
          <div className="profile-container bg-white p-5 rounded-lg shadow-md max-w-2xl mx-auto flex items-start">
  
  <div className="profile-details flex-1">
    <div className="text-gray-700 mb-2">
      <strong>Name:</strong> {profileData.fullName}
    </div>
    <div className="text-gray-700 mb-2">
      <strong>Phone Number:</strong> {profileData.phoneNumber}
    </div>
    <div className="text-gray-700 mb-2">
      <strong>House Number:</strong> {profileData.address ? profileData.address.houseNo : ""}
    </div>
    <div className="text-gray-700 mb-2">
      <strong>Street:</strong> {profileData.address ? profileData.address.street : ""}
    </div>
    <div className="text-gray-700 mb-2">
      <strong>Area:</strong> {profileData.address ? profileData.address.area : ""}
    </div>
    <div className="text-gray-700">
      <strong>City:</strong> {profileData.address ? profileData.address.city : ""}
    </div>
  </div>

  <div className="profile-image ml-5 w-32 h-32 rounded-full overflow-hidden shadow-lg">
    <img src={profileData.profilePhoto||ProfileSvg} alt="Profile" className="w-full h-full object-cover" />
  </div>
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
