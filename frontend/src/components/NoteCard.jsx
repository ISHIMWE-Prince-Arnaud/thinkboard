import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../utils/utils'
import api from '../utils/axios'
import toast from 'react-hot-toast'

const NoteCard = ({ note, setNotes }) => {
  async function handleDelete(e, id) {
    e.preventDefault()
    e.stopPropagation()

    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await api.delete(`/delete/${id}`)
        toast.success('Note deleted successfully')
        setNotes((prevNotes) => prevNotes.filter((n) => n._id !== id))
      } catch (error) {
        console.error('Error deleting note', error)
        toast.error('Failed to delete note')
      }
    }
  }

  return (
    <Link
      to={`/note/${note._id}`}
      className='card bg-base-100 hover:shadow-lg hover:scale-105 transition-all duration-200 border-t-8 border-solid border-primary border'
    >
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions flex justify-between items-center mt-4'>
          <span className='text-sm text-base-content/60'>
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-4' />
            <button
              className='btn btn-ghost btn-xs text-error'
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className='size-4' />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard