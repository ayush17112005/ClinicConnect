import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGO_URL;

// async function main() {
//   await mongoose.connect(url);
//   console.log("Db connected");
// }

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Db Connected");
  } catch (error) {
    console.error("Mongo Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
