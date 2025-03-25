import express from "express";
import {
  createTask,
  getAllTask,
  getNextTask,
  getTask,
} from "../Controller/TaskControlller.js";
import { UserExist } from "../middlewares/tasksmiddlewares.js";
const router = express.Router();
router.route("/").get(getTask).post(UserExist, createTask);
router.route("/tasks").get(getAllTask);
router.route("/getnexttask").get(getNextTask);
export default router;
