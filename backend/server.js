import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

//Let's connect the db and cloudinarystorage in our project
connectDB();
connectCloudinary();

//middlewares
app.use(cors());
app.use(express.json());

//Api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`Server listining to port ${port}`);
});
