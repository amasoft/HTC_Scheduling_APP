import mongoose from "mongoose";
import { type } from "os";

const task = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  DueDate: {
    type: Date,
    required: true,
  },
});
const Task = mongoose.model("Tasks", task);
export default Task;
