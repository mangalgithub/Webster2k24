import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Designer } from "../models/designer.model.js";
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
      profilePhoto,
    } = req.body;
    console.log(req.body);

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
    const oldUser = await Designer.findOne({ email });
    if (oldUser) {
      return res.status(400).json({
        message: "You already have a account. Please login.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
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
    });

    //!cloudinary wala code idhar aaega

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
      profilePhoto,
    } = req.body;

    //!cloudinary wala code idhar aaega

    let userId = req.id; //the id of user which is logined
    let user = await Designer.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "Designer not found",
        success: false,
      });
    }
    //updating the data

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (password) user.password = password;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (storeName) user.address.storeName = storeName;
    if (street) user.address.street = street;
    if (area) user.address.area = area;
    if (city) user.address.city = city;
    if (profilePhoto) user.profilePhoto = profilePhoto;

    //this is what is actually making the changes in the database
    await user.save();

    user = {
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: {
        storeName: user.storeName,
        street: user.street,
        area: user.area,
        city: user.city,
      },
      profilePhoto: user.profilePhoto,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status.json(400)({
      message: "internal server error",
      success: false,
    });
  }
};
