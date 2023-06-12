import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },

  for: {
    type: String,
  },

  passwordType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.Password || mongoose.model("Password", PasswordSchema);