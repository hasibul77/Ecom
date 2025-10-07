import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");

    await mongoose.connect(process.env.MONGO_URI); // No need for useNewUrlParser or useUnifiedTopology
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
