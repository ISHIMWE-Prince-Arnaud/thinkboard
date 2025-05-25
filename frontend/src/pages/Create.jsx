import { ArrowLeftIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { notesApi } from '../utils/axios'
import { motion } from 'framer-motion'

const MAX_TITLE_LENGTH = 50

const Create = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields')
      return
    }
    if (title.length > MAX_TITLE_LENGTH) {
      toast.error(`Title must be at most ${MAX_TITLE_LENGTH} characters`)
      return
    }

    setIsLoading(true)

    try {
      await notesApi.post('/create', { title, content })
      toast.success('Note created successfully')
      navigate('/')
    } catch (error) {
      console.error('Error creating note', error)
      toast.error('Failed to create note')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 btn btn-ghost mb-6 text-lg font-semibold hover:text-primary transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Notes
        </Link>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 font-semibold">Create New Note</h2>

            <form onSubmit={handleSubmit} aria-busy={isLoading}>
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Title</span>
                  <span
                    className={`text-sm ${
                      title.length > MAX_TITLE_LENGTH ? 'text-error' : 'text-base-content/70'
                    }`}
                  >
                    {title.length} / {MAX_TITLE_LENGTH}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className={`input input-bordered ${
                    title.length > MAX_TITLE_LENGTH ? 'input-error' : ''
                  }`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isLoading}
                  maxLength={MAX_TITLE_LENGTH + 10} // to allow typing but warn when over
                  autoFocus
                  required
                />
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="card-actions justify-end">
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                >
                  {isLoading ? 'Creating...' : 'Create Note'}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create