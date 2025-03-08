import mongoose from "mongoose";

export const connectDB = async () => {
  try {
   const connect = await mongoose.connect(process.env.MONGODB_URL);
   console.log("Connected to DB : ",connect.connection.host);
  } catch (error) {
    console.log("Error Connecting to DB : ",error);
  }
}