import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../utils/axios";
import toast from "react-hot-toast";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";

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
        const res = await api.get(`/${id}`);
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

  async function handleDelete(e, id) {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await api.delete(`/delete/${id}`);
        toast.success("Note deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting note", error);
        toast.error("Failed to delete note");
      }
    }
  }

  async function handleSave(params) {
    if(!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/update/${note._id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating note", error);
      toast.error("Failed to update note");
    } finally{
      setSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <LoaderIcon className="animate-spin text-primary size-10" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <p className="text-base-content">Note not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-3/4 mx-auto bg-base-200 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="size-5 mr-1" />
            Back to Notes
          </Link>
          <button
            className="btn btn-error btn-outline"
            onClick={(e) => handleDelete(e, note._id)}
          >
            <Trash2Icon className="size-4 mr-1" />
            Delete Note
          </button>
        </div>

        <div className="bg-base-100 shadow p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-base-content mb-2">
            {note.title}
          </h1>
          <p className="text-base-content/80 whitespace-pre-wrap">
            {note.content}
          </p>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input
                  type='text'
                  placeholder='Note Title'
                  className='input input-bordered'
                  value={note.title}
                  onChange={(e) => setNote({...note, title: e.target.value})}
                />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  placeholder='Write your note here...'
                  className='textarea textarea-bordered h-32'
                  value={note.content}
                  onChange={(e) => setNote({...note, content: e.target.value})}
                />
              </div>

              <div className="card-actions flex justify-between">
                <Link to='/' className="btn btn-error w-32">
                  Cancel
                </Link>
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;