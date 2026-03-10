import dotenv from "dotenv";
dotenv.config();
import dns from "node:dns";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.route.js";

// Force Node.js to use reliable DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]);


import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.get("/api/chat", chatRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});