import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Customer } from "../models/customer.model.js";
import { Order } from "../models/order.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Notification } from "../models/Notification.model.js";
import { Designer } from "../models/designer.model.js";
// import uploadOnCloudinary from "../utils/cloudinary.js";

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
    } = req.body;

    // Check if the request includes all required fields
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

    // console.log(req.body);
    // console.log(req.file);
    // Check if the user already exists
    const oldUser = await Customer.findOne({ email });
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

export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
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
        httpOnly: true,
        sameSite: "strict", //This enforces a strict same-site policy, meaning the cookie will only be sent if the request originates from the same domain.
      })
      .json({
        message: `Welcome back ${customer.fullName}`,
        token: token,
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
    } = req.body;

    // Retrieve the logged-in user ID
    const userId = req.id;
    let user = await Customer.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "Customer not found",
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
    if (houseNo) user.address.houseNo = houseNo;
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
          houseNo: user.address.houseNo,
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

//to get all the orders of the customer(by his login details)
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

//for getting cart items
export const getCartItems = async (req, res) => {
  try {
    const customerId = req.id;
    const customer = await Customer.findById(customerId).populate(
      "cartItems.productId"
    );
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

//for adding products to the cart
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

//for removing all the quantity of a product from the cart
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

//for clearing the cart(deleting all products from the cart)
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

//for decrementing quantity of a product in the cart
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

//for transferring products in the cart to the order(i.e. the order has been placed)
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

//for adding a product to the wishlist
export const addToWishlist = async (req, res) => {
  try {
    const pid = req.params.id;
    const customerId = req.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    if (customer.wishlistItems.includes(pid)) {
      return res
        .status(400)
        .json({ message: "Product already in wishlist", success: false });
    }
    customer.wishlistItems.push(pid);
    await customer.save();
    return res.status(200).json({
      message: "Product added to wishlist",
      wishlistItems: customer.wishlistItems,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//to get all the products in the wishlist(which is added by the customer)
export const getWishlist = async (req, res) => {
  try {
    const customerId = req.id;
    const customer = await Customer.findById(customerId).populate(
      "wishlistItems.productId"
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({
      wishlistItems: customer.wishlistItems,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//to get all the products of the wishlist which have just been added by the followed designers and they have not seen the product yet
//Here we have assumed that when the designer will add a new product ,it will get added as a notification to all the customers following him
export const getNewWishlist = async (req, res) => {
  try {
    const notifications = await Notification.find({
      customerId: req.id,
      isRead: false,
    }).populate("productId");

    const products = notifications.map((n) => n.productId);

    return res.status(200).json({ products, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const followDesigner = async (req, res) => {
  try {
    const designerId = req.params.id;
    const customerId = req.id;
    const customer = await Customer.findById(customerId);
    const designer = await Designer.findById(designerId);
    customer.following.push(designerId);
    designer.followers.push(customerId);
    await customer.save();
    await designer.save();
    return res
      .status(200)
      .json({ message: "You are now following the designer", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const unfollowDesigner = async (req, res) => {
  try {
    const designerId = req.params.id;
    const customerId = req.id;
    const customer = await Customer.findById(customerId);
    const designer = await Designer.findById(designerId);
    customer.following = customer.following.filter((id) => id != designerId);
    designer.followers = designer.followers.filter((id) => id != customerId);
    await customer.save();
    await designer.save();
    return res
      .status(200)
      .json({ message: "You are not following the designer", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//for marking all the products in the newwishlist as read
export const markRead = async (req, res) => {
  try {
    const notifications = await Notification.find({
      customerId: req.id,
      isRead: false,
    });
    notifications.forEach((n) => {
      n.isRead = true;
      n.save();
    });
    return res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
