import jwt from "jsonwebtoken"; 
import User from "../models/user.model.js";
import { json } from "express";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = res.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized -- Access Denied" });   
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded) {
      return res.status(401).json({ message: "Unauthorized -- Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    
    if(!user) {
      return res.status(401).json({ message: "Unauthorized -- User Not Found" });
    }
    
    req.user = user;
    next();   
    
  } catch (error) {
    console.log("Error in protectedRoute middleware", error.message);
    res.status(500).json({ message: "Internal Error" });
  }
}