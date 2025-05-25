import express from "express";
import notesRoutes from "./src/routes/notes.route.js";
import userRoutes from './src/routes/user.route.js';
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from "cookie-parser";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
}

app.use(express.json());
app.use(cookieParser());

app.use("/notes", notesRoutes);
app.use("/user", userRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});