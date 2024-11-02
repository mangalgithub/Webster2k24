import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Designer } from "../models/designer.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
export const registerDesigner = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      storeName,
      street,
      area,
      city,
    } = req.body;

    // Check if the request includes all required fields
    if (
      !fullName ||
      !email ||
      !password ||
      !phoneNumber ||
      !storeName ||
      !street ||
      !area ||
      !city
    ) {
      return res
        .status(400)
        .json({ message: "Not all fields have been entered.", success: false });
    }

    // console.log(req.body);
    // console.log(req.file);
    // Check if the user already exists
    const oldUser = await Designer.findOne({ email });
    if (oldUser) {
      return res.status(400).json({
        message: "You already have an account. Please login.",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Upload profile photo if available
    let profilePhotoUrl = "";
    if (req.file) {
      const response = await uploadOnCloudinary(req.file.path);
      profilePhotoUrl = response.secure_url;
    }

    // Create the customer
    await Designer.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      address: {
        storeName,
        street,
        area,
        city,
      },
      profilePhoto: profilePhotoUrl, // Save profile photo URL
    });

    return res.status(200).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const loginDesigner = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.staus(400).json({
        message: "Not all fields have been entered.",
        success: false,
      });
    }
    let designer = await Designer.findOne({ email });
    if (!designer) {
      return res.status(400).json({
        message: "No account with this email has been registered.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, designer.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password. Please try again.",
        success: false,
      });
    }

    const tokenData = {
      userId: designer._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    //to avoid the hacker to get the token
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true, //It ensures that the cookie is only accessible through HTTP(S) requests, not by JavaScript.
        sameSite: "strict", //This enforces a strict same-site policy, meaning the cookie will only be sent if the request originates from the same domain.
      })
      .json({
        message: `Welcome back ${designer.fullName}`,
        success: true,
        token:token
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const logoutDesigner = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const updateDesignerProfile = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      storeName,
      street,
      area,
      city,
    } = req.body;

    // Retrieve the logged-in user ID
    const userId = req.id;
    let user = await Designer.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "Designer not found",
        success: false,
      });
    }

    // Update the profile photo on Cloudinary if uploaded
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (uploadResult) {
        user.profilePhoto = uploadResult.secure_url;
      }
    }

    // Update other fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 12);
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (storeName) user.address.storeName = storeName;
    if (street) user.address.street = street;
    if (area) user.address.area = area;
    if (city) user.address.city = city;

    // Save the updated user to the database
    await user.save();

    // Return the updated user profile
    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: {
          storeName: user.address.storeName,
          street: user.address.street,
          area: user.address.area,
          city: user.address.city,
        },
        profilePhoto: user.profilePhoto,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
