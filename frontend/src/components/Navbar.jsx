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
          <Link to="/home" className="text-3xl font-bold text-primary font-mono tracking-tighter">
            ThinkBoard
          </Link>

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
                    className="btn btn-primary rounded-full flex items-center gap-2"
                    aria-label="Create a new note"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span>New Note</span>
                  </Link>
                </motion.div>
                <button
                  onClick={logout}
                  className="btn btn-error hidden rounded-full sm:inline-block"
                >
                  Logout
                </button>
                <Link to="/profile" className="hidden sm:inline-block">
                  <span className="text-base-content/80 hover:text-base-content">
                    <img src={user.avatar} alt="Profile picture" className="w-12 h-12 rounded-full" />
                  </span>
                </Link>
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