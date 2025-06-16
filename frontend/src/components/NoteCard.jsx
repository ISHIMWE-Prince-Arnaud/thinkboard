import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/utils'
import { notesApi } from '../utils/axios.js'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const NoteCard = ({ note, setNotes }) => {
  async function handleDelete(e, id) {
    e.preventDefault()
    e.stopPropagation()

    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await notesApi.delete(`/delete/${id}`)
        toast.success('Note deleted successfully')
        setNotes((prevNotes) => prevNotes.filter((n) => n._id !== id))
      } catch (error) {
        console.error('Error deleting note', error)
        toast.error('Failed to delete note')
      }
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)' }}
      className="border-t-8 border-primary card bg-base-100 border cursor-pointer flex flex-col"
    >
      <Link to={`/note/${note._id}`} className="block p-4 flex-grow">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3 mt-2">{note.content}</p>
      </Link>

      {/* Footer with date, edit and delete buttons */}
      <div className="card-actions flex justify-between items-center p-4 pt-0">
        <span className="text-sm text-base-content/60">
          {formatDate(new Date(note.createdAt))}
        </span>
        <div className="flex items-center gap-2">
          <Link
            to={`/note/${note._id}`}
            className="btn btn-ghost btn-xs"
            aria-label="Edit note"
            title="Edit note"
          >
            <PenSquareIcon className="w-5 h-5 text-primary" aria-label="Edit note" />
          </Link>
          <button
            className="btn btn-ghost btn-xs text-error"
            onClick={(e) => handleDelete(e, note._id)}
            aria-label="Delete note"
            title="Delete note"
          >
            <Trash2Icon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default NoteCard