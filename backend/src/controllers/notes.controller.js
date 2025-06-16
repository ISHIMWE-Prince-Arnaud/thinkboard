import Note from "../models/Note.js";

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content, user: req.user._id });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    console.error("Error in creating the note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
    console.log("Notes provided successfully");
  } catch (error) {
    console.error("Error in notes controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getOneNote(req, res) {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getting one note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
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
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleting note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}