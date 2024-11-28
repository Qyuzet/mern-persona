import express from "express";

import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  findUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", findUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
