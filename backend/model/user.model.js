import mongoose from "mongoose";

const userScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    credential: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const User = new mongoose.model("User", userScheme);

export default User;
