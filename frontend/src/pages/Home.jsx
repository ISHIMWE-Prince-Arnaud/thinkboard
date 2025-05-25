import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import NoteCardSkeleton from "../components/NoteCardSkeleton";
import { notesApi } from "../utils/axios";
import NotesNotFound from "../components/NotesNotFound";
import toast from "react-hot-toast";

function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await notesApi.get("/");
      setNotes(res.data);
    } catch (error) {
      setError("Failed to fetch notes.");
      toast.error("Failed to fetch notes.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="max-w-5xl mx-auto p-4 mt-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <NoteCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-error font-semibold">{error}</p>
            <button
              onClick={fetchNotes}
              className="btn btn-outline btn-error w-1/4"
            >
              Retry
            </button>
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500 opacity-100">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        ) : (
          <NotesNotFound />
        )}
      </main>
    </div>
  );
}

export default Home;