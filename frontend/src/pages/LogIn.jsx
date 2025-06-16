import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MailIcon,
  LockIcon,
  CheckCircle2Icon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { userApi } from "../utils/axios.js";
import { useAuth } from "../components/AuthContext.jsx";

const LogIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await userApi.post("/login", form);
      const { data } = await userApi.get("/profile");
      login(data, "");
      toast.success("Logged in successfully!");
      navigate("/home");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-base-200 p-4"
    >
      <motion.div
        layout
        className="max-w-md w-full bg-base-100 shadow rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-base-content flex items-center justify-center gap-2">
          <CheckCircle2Icon className="w-6 h-6 text-primary" />
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control relative">
            <label className="label">
              <span className="label-text flex items-center gap-1">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered pl-10"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
            <MailIcon className="absolute top-[63%] left-3 w-5 h-5 text-base-content/40 pointer-events-none" />
          </div>

          <div className="form-control relative">
            <label className="label" htmlFor="password">
              <span className="label-text flex items-center gap-1">Password</span>
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered pl-10 pr-10"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              required
              minLength={6}
            />
            <LockIcon className="absolute top-[60%] left-3 w-5 h-5 text-base-content/40 pointer-events-none" />

            <button
              type="button"
              className="absolute right-3 top-[58%] w-5 h-5 text-base-content/60"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <motion.button
            type="submit"
            className={`btn btn-primary w-full mt-4 ${loading ? "loading" : ""}`}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            aria-label="Log In"
          >
            {loading ? (
              "Logging In..."
            ) : (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2Icon className="w-5 h-5" />
                Log In
              </div>
            )}
          </motion.button>
        </form>

        <p className="text-center text-sm text-base-content/60 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LogIn;