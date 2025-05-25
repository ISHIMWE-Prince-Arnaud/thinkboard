import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const Welcome = () => {
  return (
    <>
      <Navbar />
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[87vh] flex flex-col justify-center items-center bg-base-200 px-4 text-center"
    >
      <div className="max-w-xl bg-base-100 rounded-lg shadow-lg p-10">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Welcome to Our Website
        </h1>
        <p className="text-gray-500 mb-8 text-lg">
          Explore, connect, and grow with our amazing community. 
          Whether you want to create an account or just browse around, we're excited to have you here!
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/login"
            className="btn btn-outline btn-primary px-8 py-3 font-semibold transition hover:bg-primary hover:text-white"
            aria-label="Log In"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="btn btn-primary px-8 py-3 font-semibold"
            aria-label="Sign Up"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Welcome;