import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log("✅ DB connected successfully");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1); // Exit the app if DB connection fails
  }
};

export default connectDb;
