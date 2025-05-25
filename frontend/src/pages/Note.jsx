import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { notesApi } from "../utils/axios";
import toast from "react-hot-toast";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Note = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      setIsLoading(true);
      try {
        const res = await notesApi.get(`/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note");
        console.error("Error in fetching note", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await notesApi.delete(`/delete/${id}`);
        toast.success("Note deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting note", error);
        toast.error("Failed to delete note");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (note.title.length > 50) {
      toast.error("Title is too long");
      return;
    }

    setSaving(true);

    try {
      await notesApi.put(`/update/${note._id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating note", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  // Variants for motion components
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  const buttonTap = { scale: 0.95 };

  if (isLoading) {
    return (
      <motion.div
        className="min-h-screen bg-base-200 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        aria-label="Loading note"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <LoaderIcon className="text-primary size-10" />
        </motion.div>
      </motion.div>
    );
  }

  if (!note) {
    return (
      <motion.div
        className="min-h-screen bg-base-200 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        aria-live="polite"
      >
        <p className="text-base-content">Note not found.</p>
      </motion.div>
    );
  }

  return (
    <motion.section
      className="min-h-screen w-full max-w-3xl mx-auto bg-base-200 flex items-center justify-center px-4 py-8"
      aria-live="polite"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <motion.Link
            to="/"
            className="btn btn-ghost"
            aria-label="Back to notes"
            whileTap={buttonTap}
          >
            <ArrowLeftIcon className="size-5 mr-1" />
            Back to Notes
          </motion.Link>
          <motion.button
            className="btn btn-error btn-outline"
            onClick={(e) => handleDelete(e, note._id)}
            aria-label="Delete note"
            disabled={saving}
            whileTap={buttonTap}
            whileHover={{ scale: 1.05 }}
          >
            <Trash2Icon className="size-4 mr-1" />
            Delete Note
          </motion.button>
        </div>

        <motion.div
          className="bg-base-100 shadow p-6 rounded-lg mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          aria-live="polite"
        >
          <h1 className="text-2xl font-bold text-base-content mb-2">{note.title}</h1>
          <p className="text-base-content/80 whitespace-pre-wrap">{note.content}</p>
        </motion.div>

        <motion.form
          className="card bg-base-100 shadow rounded-lg p-6"
          onSubmit={handleSave}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          aria-label="Edit note form"
        >
          <div className="form-control mb-4">
            <label className="label" htmlFor="title">
              <span className="label-text">Title</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="Note Title"
              className="input input-bordered"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              disabled={saving}
            />
          </div>

          <div className="form-control mb-6">
            <label className="label" htmlFor="content">
              <span className="label-text">Content</span>
            </label>
            <textarea
              id="content"
              placeholder="Write your note here..."
              className="textarea textarea-bordered h-32"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              disabled={saving}
            />
          </div>

          <div className="card-actions flex justify-between">
            <motion.Link
              to="/"
              className="btn btn-error w-32"
              aria-label="Cancel editing"
              whileTap={buttonTap}
              whileHover={{ scale: 1.05 }}
            >
              Cancel
            </motion.Link>
            <motion.button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
              aria-live="polite"
              aria-busy={saving}
              whileTap={buttonTap}
              whileHover={{ scale: 1.05 }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default Note;