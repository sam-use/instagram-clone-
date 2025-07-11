// ✅ index.js (Backend Entry Point)
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Server } from "socket.io";

import connectDB from "./utils/db.js";
import userroute from "./routes/user.js";
import postroute from "./routes/post.route.js";
import messageroute from "./routes/message.route.js";
import { setupSocket } from "./socket/socket.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "https://bondly-social-site-1.onrender.com",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// ✅ Basic Test Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the backend server", success: true });
});

// ✅ Mount all routes
app.use("/api/v1/user", userroute);
app.use("/api/v1/posts", postroute);
app.use("/api/v1/message", messageroute);

// ✅ Create HTTP Server & Attach Socket.IO
const server = http.createServer(app);


setupSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});





