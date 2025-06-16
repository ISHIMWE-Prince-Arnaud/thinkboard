import { FileWarningIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotesNotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center h-[50vh] text-center text-base-content/80 px-4"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <FileWarningIcon className="w-16 h-16 mb-4 text-error" />
      </motion.div>
      <h2 className="text-2xl font-semibold mb-2">No Notes Found</h2>
      <p className="text-base mb-4 max-w-sm">
        You haven’t created any notes yet. Start by adding one!
      </p>
      <Link
        to="/create"
        className="btn btn-primary px-6 py-2 text-lg transition-transform hover:scale-105"
      >
        Create Your First Note
      </Link>
    </motion.div>
  )
}

export default NotesNotFound