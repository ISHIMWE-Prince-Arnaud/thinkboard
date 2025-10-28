import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserIcon,
  MailIcon,
  LockIcon,
  CheckCircle2Icon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { userApi } from "../utils/axios";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await userApi.post("/signup", form);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Signup failed. Try again.");
      console.error("Signup error", error);
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
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control relative">
            <label className="label" htmlFor="username">
              <span className="label-text flex items-center gap-1">
                Username
              </span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Your username"
              className="input input-bordered pl-10"
              value={form.username}
              onChange={handleChange}
              disabled={loading}
              required
            />
            <UserIcon className="absolute top-[63%] left-3 w-5 h-5 text-base-content/40 pointer-events-none" />
          </div>

          <div className="form-control relative">
            <label className="label" htmlFor="email">
              <span className="label-text flex items-center gap-1">
                Email
              </span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered pl-10"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
            <MailIcon className="absolute top-[63%] left-3 w-5 h-5 text-base-content/40 pointer-events-none" />
          </div>

          {/* Password input with visibility toggle */}
          <div className="form-control relative">
            <label className="label" htmlFor="password">
              <span className="label-text flex items-center gap-1">
                Password
              </span>
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

            {/* Toggle button */}
            <button
              type="button"
              className="absolute right-3 top-[60%] w-5 h-5 text-base-content/60"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {/* Confirm Password input with visibility toggle */}
          <div className="form-control relative">
            <label className="label" htmlFor="confirmPassword">
              <span className="label-text flex items-center gap-1">
                Confirm Password
              </span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="input input-bordered pl-10 pr-10"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              required
              minLength={6}
            />
            <LockIcon className="absolute top-[60%] left-3 w-5 h-5 text-base-content/40 pointer-events-none" />

            {/* Toggle button */}
            <button
              type="button"
              className="absolute right-3 top-[60%] w-5 h-5 text-base-content/60"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {/* Submit button unchanged */}
          <motion.button
            type="submit"
            className={`btn btn-primary w-full mt-4 ${loading ? "loading" : ""}`}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            aria-label="Sign Up"
          >
            {loading ? "Signing Up..." : (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2Icon className="w-5 h-5" />
                Sign Up
              </div>
            )}
          </motion.button>
        </form>

        <p className="text-center text-sm text-base-content/60 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;