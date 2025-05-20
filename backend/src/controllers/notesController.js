import Note from "../models/Note.js";

// GET all notes
export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
    console.log("Notes provided successfully");
  } catch (error) {
    console.error("Error in notes controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// GET one note
export async function getOneNote(req, res) {
  try {
    const note = await Note.findById(req.params.id); // ❗ await was missing
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note); // ❗ moved outside the if block
  } catch (error) {
    console.error("Error in getting one note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// CREATE a note
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    console.error("Error in creating the note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// UPDATE a note
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error("Error in updating the note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// DELETE a note
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleting note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}