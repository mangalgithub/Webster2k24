import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Customer } from "../models/customer.model.js";
import { Order } from "../models/order.model.js";
export const registerCustomer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      houseNo,
      street,
      area,
      city,
      profilePhoto,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password ||
      !phoneNumber ||
      !houseNo ||
      !street ||
      !area ||
      !city
    ) {
      return res
        .status(400)
        .json({ message: "Not all fields have been entered.", success: false });
    }
    const oldUser = await Customer.findOne({ email });
    if (oldUser) {
      return res.status(400).json({
        message: "You already have a account. Please login.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await Customer.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      address: {
        houseNo,
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

export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.staus(400).json({
        message: "Not all fields have been entered.",
        success: false,
      });
    }
    let customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({
        message: "No account with this email has been registered.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, customer.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password. Please try again.",
        success: false,
      });
    }

    const tokenData = {
      userId: customer._id,
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
        message: `Welcome back ${customer.fullName}`,
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
export const logoutCustomer = async (req, res) => {
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

export const updateCustomerProfile = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      houseNo,
      street,
      area,
      city,
      profilePhoto,
    } = req.body;

    //!cloudinary wala code idhar aaega

    let userId = req.id; //the id of user which is logined
    let user = await Customer.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "Customer not found",
        success: false,
      });
    }
    //updating the data

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (password) user.password = password;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (houseNo) user.address.houseNo = houseNo;
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
        houseNo: user.houseNo,
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

export const myOrders = async (req, res) => {
  try {
    const userId = req.id;
    const orders = await Order.find({ customerId: userId })
      .populate("orderItems.productId")
      .sort({ createdAt: -1 });
    return res.status(200).json({ orders, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const customerId = req.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ message: "Customer not found", success: false });
    }
    return res
      .status(200)
      .json({ cartItems: customer.cartItems, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const customerId = req.id;
    // Find the customer in the database
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if the product already exists in the cart
    const existingCartItem = customer.cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (existingCartItem) {
      // Update quantity if product already in cart
      existingCartItem.quantity += Number(quantity) || 1;
    } else {
      // Else, add new product to cart
      customer.cartItems.push({
        productId,
        quantity: Number(quantity) || 1,
      });
    }

    // Save the updated customer document
    await customer.save();

    res.status(200).json({
      message: "Product added to cart",
      cartItems: customer.cartItems,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const customerId = req.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const updatedCartItems = customer.cartItems.filter(
      (item) => item.productId.toString() !== productId
    );
    customer.cartItems = updatedCartItems;
    await customer.save();
    return res.status(200).json({
      message: "Product removed from cart",
      cartItems: customer.cartItems,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const clearCart = async (req, res) => {
  try {
    const customerId = req.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    customer.cartItems = [];
    await customer.save();
    return res.status(200).json({ message: "Cart cleared", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const decrementQuantity = async (req, res) => {
  try {
    const productId = req.query.productId;
    const customerId = req.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    let updatedCartItems = customer.cartItems.map((item) => {
      if (item.productId.toString() === productId) {
        item.quantity -= 1;
      }
      return item;
    });
    updatedCartItems = updatedCartItems.filter((item) => item.quantity > 0);

    customer.cartItems = updatedCartItems;
    await customer.save();
    return res
      .status(200)
      .json({ message: "Quantity decremented", cartItems: customer.cartItems });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const cartToOrder = async (req, res) => {
  try {
    const customerId = req.id;
    const customer = await Customer.findById(customerId).populate(
      "cartItems.productId"
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    //console.log(customer.cartItems);
    if (customer.cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const order = new Order({
      customerId: customer._id,
      orderItems: customer.cartItems,
      totalAmount: customer.cartItems.reduce(
        (acc, item) => acc + item.quantity * item.productId.price,
        0
      ),
    });
    //console.log(order);
    await order.save();
    customer.cartItems = [];
    await customer.save();
    return res
      .status(200)
      .json({ message: "Cart converted to order", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
