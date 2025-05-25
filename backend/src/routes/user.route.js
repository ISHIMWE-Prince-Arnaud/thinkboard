import express from "express";
import { login, logout, profile, signup, updateProfile } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.route('/profile').get(protect, profile).put(protect,updateProfile);

export default router;