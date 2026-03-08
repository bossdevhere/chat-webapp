import dotenv from "dotenv";
dotenv.config();
import dns from "node:dns";

// Force Node.js to use reliable DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]);


import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});