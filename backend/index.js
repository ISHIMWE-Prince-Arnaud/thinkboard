import express from "express";
import notesRoutes from "./src/routes/notesRoutes.js";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

// ✅ Required for ES modules to emulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// ✅ CORS only in development
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Optional if you're handling cookies or sessions
  }));
}

app.use(express.json());

// ✅ Mount API routes
app.use("/notes", notesRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// ✅ Connect to DB and start server
connectDB().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});