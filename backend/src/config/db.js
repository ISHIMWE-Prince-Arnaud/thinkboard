import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected successfully!!!");
  } catch (error) {
    console.error("Error in DB connection", error);
    throw new Error("Database connection failed"); // Let the app handle the error
  }
};