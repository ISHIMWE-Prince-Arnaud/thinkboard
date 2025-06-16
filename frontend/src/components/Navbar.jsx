import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-base-300 border-b border-base-content/10 shadow-sm">
      <div className="mx-auto p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
            ThinkBoard
          </h1>

          <div className="flex items-center gap-4">
            {user && (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                >
                  <Link
                    to="/create"
                    className="btn btn-primary flex items-center gap-2"
                    aria-label="Create a new note"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span>New Note</span>
                  </Link>
                </motion.div>
                <button
                  onClick={logout}
                  className="btn btn-error hidden sm:inline-block"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="btn btn-primary btn-outline">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
              
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;