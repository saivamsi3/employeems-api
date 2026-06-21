import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Token Not Provided or Invalid Format",
      });
    }

    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(decode._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("VERIFY ERROR:", error);

    return res.status(401).json({
      success: false,
      error: "Invalid or Expired Token",
    });
  }
};

export default verifyUser;