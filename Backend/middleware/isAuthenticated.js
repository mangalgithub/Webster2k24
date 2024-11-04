import jwt from "jsonwebtoken";
//it is a middleware to check whether the user is loginned or not (to check kar lo ki uska token valid hai ya nhi)

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("token not found");
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }
    //actually the req.id will be the user id
    req.id = decode.userId;
    //matlab ab agle middleware ya api function pe jao
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export default isAuthenticated;
