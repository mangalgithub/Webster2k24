import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import customerRoute from "./routes/customer.route.js";
import productCRoute from "./routes/productC.route.js";
import designerRoute from "./routes/designer.route.js";
import productDRoute from "./routes/productD.route.js";
import reviewRoute from "./routes/review.route.js";
const app = express();

import connectDB from "./utils/mongo.js";
// the dotenv package is commonly used to load these environment variables into process.env, making them accessible throughout your application.
dotenv.config({});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//It parses the Cookie header from incoming HTTP requests and makes the cookies available as a JavaScript object (req.cookies) in your request handler. This means you can easily access the cookies sent by the client (e.g., a web browser) without having to manually decode or parse the raw cookie string.
app.use(cookieParser());

//for cross origin and running both backend and frontend parallely on different ports
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

//Routes
app.use("/api/customer", customerRoute);
app.use("/api/productC", productCRoute);
app.use("/api/designer", designerRoute);
app.use("/api/productD", productDRoute);
app.use("/api/review", reviewRoute);

const port = 5000;
app.listen(port, () => {
  connectDB();
  console.log(`Backend server listening at port ${port}`);
});
