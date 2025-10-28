import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { userApi } from "../utils/axios.js";
import { UserIcon, MailIcon, LockIcon } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";

const Profile = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await userApi.get("profile");
        setForm({
          username: data.username,
          email: data.email,
          avatar: data.avatar,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        toast.error("Failed to load profile");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
    if (!form.email.trim()) {
      toast.error("Email cannot be empty");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password && form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      // Prepare payload only with username, email and password if present
      const payload = {
        username: form.username,
        email: form.email,
      };
      if (form.password) payload.password = form.password;

      await userApi.put("/user/profile", payload);

      toast.success("Profile updated successfully!");
      // Clear passwords after update
      setForm((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[87vh] flex items-center justify-center bg-base-200 p-4"
    >
      <motion.div className="max-w-2xl bg-base-100 shadow rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-base-content flex items-center justify-center gap-2">
          <UserIcon className="w-6 h-6 text-primary" />
          Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-2">
            <img
              src={form.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
          </div>

          <div className="flex justify-between gap-4">
            <div className="form-control relative w-full">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="input input-bordered pl-10"
                value={form.username}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <UserIcon className="absolute left-3 top-[63%] w-5 h-5 text-base-content/40 pointer-events-none" />
            </div>
            <div className="form-control relative w-full">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input input-bordered pl-10"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <MailIcon className="absolute left-3 top-[63%] w-5 h-5 text-base-content/40 pointer-events-none" />
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <div className="form-control relative w-full">
              <label htmlFor="password" className="label">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="input input-bordered pl-10"
                placeholder="Leave blank to keep current password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                minLength={6}
              />
              <LockIcon className="absolute left-3 top-[63%] w-5 h-5 text-base-content/40 pointer-events-none" />
            </div>
            <div className="form-control relative w-full">
              <label htmlFor="confirmPassword" className="label">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="input input-bordered pl-10"
                placeholder="Confirm new password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                minLength={6}
              />
              <LockIcon className="absolute left-3 top-[63%] w-5 h-5 text-base-content/40 pointer-events-none" />
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <motion.button
              type="submit"
              className={`btn btn-primary w-[45%] mt-4 ${loading ? "loading" : ""}`}
              disabled={loading}
              whileTap={{ scale: 0.95 }}
              aria-label="Update Profile"
            >
              {loading ? "Updating..." : "Update Profile"}
            </motion.button>
            <Link
              to="/home"
              className="btn btn-outline btn-ghost w-[45%] mt-4"
            >
              Cancel
            </Link>
          </div>
        </form>
      </motion.div>
    </motion.div>
    </>
  );
};

export default Profile;