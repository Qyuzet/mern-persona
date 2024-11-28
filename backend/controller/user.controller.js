import mongoose from "mongoose";
import User from "../model/user.model.js";

export const findUser = async (req, res) => {
  const { username, email, password, isGoogle } = req.body;

  try {
    // Search for the user by username OR email
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // If it's a Google login, check the Google credential
    if (isGoogle && user.isGoogle) {
      if (user.credential !== password) {
        // Assuming `password` is used for Google credential here
        return res
          .status(401)
          .json({ success: false, message: "Invalid Google credentials" });
      }
    } else {
      // For non-Google users, compare stored password
      const isUsernameValid = user.username === username;
      const isPasswordValid = user.password === password; // Replace with hash comparison if needed
      if (!isPasswordValid && !isUsernameValid) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" });
      }
    }

    // Successful login
    res.json({ success: true, data: user, req: username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error in fetching users:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { username, email, password, credential } = req.body; // Destructure fields from the request body

  // Validate required fields
  if (!username || !email || !password || !credential) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }

  const newUser = new User({ username, email, password, credential });

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error in creating user:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update an existing user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, credential } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  // Validate required fields
  // if (!username || !email || !password || !credential) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "Please provide all required fields" });
  // }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password, credential },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error in updating user:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleting user:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
