import { FileWarningIcon } from 'lucide-react'
import { Link } from 'react-router'

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center text-base-content/7">
      <FileWarningIcon className="w-12 h-12 mb-4 text-base-content/40" />
      <h2 className="text-xl font-semibold mb-2">No Notes Found</h2>
      <p className="text-sm">You haven’t created any notes yet. Start by adding one!</p>
      <Link to="/create" className="btn btn-primary mt-4">
          Create Your First Note
      </Link>
    </div>
  )
}

export default NotesNotFound