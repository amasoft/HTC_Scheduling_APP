import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
} from "../Controller/UserController.js";
const router = express.Router();
router.route("/").get(getAllUsers).post(createUser);
router.route("/user").get(getUser);
export default router;
