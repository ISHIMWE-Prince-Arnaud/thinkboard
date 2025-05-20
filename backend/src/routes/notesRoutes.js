import express from "express";
import { createNote, deleteNote, getAllNotes, getOneNote, updateNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getOneNote);
router.post("/create", createNote);
router.put('/update/:id', updateNote);
router.delete('/delete/:id', deleteNote);

export default router;