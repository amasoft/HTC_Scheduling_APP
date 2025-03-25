import Task from "../Model/Tasks.js";
import User from "../Model/Users.js";
import mongoose from "mongoose";

import asyncHandler from "../../Utils/asyncHandler.js";
import sendmail from "../../Utils/sendmail.js";
const getTask = asyncHandler(async (req, res) => {
  const { taskId } = req.body;
  console.log("users are here" + taskId);
  // const task = await Task.findById(taskId).populate("user");
  const task = await Task.findById(taskId).populate({
    path: "user",
    model: User, // Ensure the correct model name
  });
  console.log(JSON.stringify(task));
  if (!task)
    return res.status(400).json({
      message: "task Does not exist",
    });
  res.status(200).json({
    data: task,
  });
});
const getAllTask = asyncHandler(async (req, res) => {
  getNextSunday();
  const task = await Task.find({}).populate({
    path: "user",
    model: User, // Ensure the correct model name
  });
  console.log(JSON.stringify(task));
  if (!task)
    return res.status(400).json({
      message: "task Does not exist",
    });
  res.status(200).json({
    data: task,
  });
});
const createTask = asyncHandler(async (req, res) => {
  const { userId, Role, DueDate } = req.body;
  console.log(userId, Role, DueDate);

  if (!userId || !Role || !DueDate) {
    throw new Error("pleas fill all the inputs");
  }

  const newTask = new Task({
    user: new mongoose.Types.ObjectId(userId),
    Role,
    DueDate,
  });
  try {
    await newTask.save();
    res.status(201).json({
      _id: newTask._id,
      data: newTask,
    });
  } catch (error) {
    res.status(400);
    throw new Error("invalid user data" + error);
  }
});

//get next sunday roles
const task_1 = asyncHandler(async (req, res) => {
  const nextSunday = getNextSunday();
  const task = await Task.find({
    DueDate: nextSunday,
  }).populate({
    path: "user",
    model: User, // Ensure the correct model name
  });
  if (!task)
    return res.status(400).json({
      message: "task Does not exist",
    });
  //   const task_Data = task.map((taskk, id) => ({
  //     id: taskk._id,
  //     email: taskk.user.email,
  //   }
  // ));
  task.map((taskk, id) => {
    sendmail("1234", taskk.user.email);
  });
  console.log("<><><>");
  // console.log(task_Data);
});
const getNextTask = asyncHandler(async (req, res) => {
  const nextSunday = getNextSunday();
  const task = await Task.find({
    DueDate: nextSunday,
  }).populate({
    path: "user",
    model: User, // Ensure the correct model name
  });
  if (!task)
    return res.status(400).json({
      message: "task Does not exist",
    });
  return res.status(400).json({
    message: "Task exists",
    data: task,
  });
  // task.map((taskk, id) => {
  //   sendmail("1234", taskk.user.email);
  // });
  console.log("<><><>");
});

const fetchNextTask = async (role) => {
  const nextSunday = getNextSunday();
  const task = await Task.find({
    DueDate: nextSunday,
    Role: role,
  }).populate({
    path: "user",
    model: User,
  });

  if (!task || task.length === 0) return null;
  return task;
};

function getNextSunday() {
  const today = new Date();
  const dayOfWeek = today.getUTCDay(); // 0 (Sunday) to 6 (Saturday)
  const daysUntilSunday = (7 - dayOfWeek) % 7 || 7; // Days to next Sunday
  const nextSunday = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate() + daysUntilSunday,
      0,
      0,
      0,
      0
    )
  );
  displayMessage("Nextsunday", nextSunday);
  return nextSunday; // Returns a Date object in UTC
}
// task_1();
// getNextTask();
function displayMessage(tag, content) {
  console.log(tag, "  " + content);
}
export { getTask, getAllTask, createTask, getNextTask, fetchNextTask };
