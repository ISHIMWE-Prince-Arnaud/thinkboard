import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const getRandomAvatar = () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  return `https://avatar.iran.liara.run/public/${randomNumber}.png`;
};

const userSchema = new mongoose.Schema({
  username: { 
          type: String, 
          required: true 
  },
  email: {
          type: String, 
          required: true, 
          unique: true 
  },
  password: { 
          type: String, 
          required: true 
  },
  avatar: { 
          type: String, 
          default: getRandomAvatar 
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;