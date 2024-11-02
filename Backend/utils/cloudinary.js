import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "deaqibbrj",
  api_key: "852729651797537",
  api_secret: "cXG5AEuR5zQocsSOJWng3EBDOTI",
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File path is required");
    }

    // Upload the file
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log("File has been uploaded successfully");

    // Remove the locally saved temporary file
    fs.unlinkSync(filePath);

    // Return the response
    return response;
  } catch (error) {
    console.log(error);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error("Cloudinary upload failed");
  }
};

export default uploadOnCloudinary;
