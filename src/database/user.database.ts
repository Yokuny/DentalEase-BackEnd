import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: { type: String, minlength: 5, maxlength: 26, required: true },
  email: { type: String, minlength: 5, maxlength: 50, required: true, unique: true },
  password: { type: String, minlength: 5, maxlength: 200, required: true },
  avatar: { type: String, default: "https://i.imgur.com/6VBx3io.png" },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
