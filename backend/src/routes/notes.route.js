import express from "express";
import { createNote, deleteNote, getAllNotes, getOneNote, updateNote } from "../controllers/notes.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAllNotes);
router.get("/:id", protect, getOneNote);
router.post("/create", protect, createNote);
router.put('/update/:id', protect, updateNote);
router.delete('/delete/:id',protect, deleteNote);

export default router;