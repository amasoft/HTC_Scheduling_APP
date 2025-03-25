import express from "express";
import connectDB from "./Helpers/db.js";
import cors from "cors";
import cron from "node-cron";
import userRoutes from "./src/Routes/UsersRoutes.js";
import taskRoute from "./src/Routes/TasksRoutes.js";
import { dispatchTaskCommunion, dispatchTaskPsalm } from "./Utils/Tasks.js";
import { sendSMSNotification } from "./Utils/Notification.js";
// import { Notifications } from "./Utils/Notification.js";

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const baseurl = "/api/v1";
app.use(`${baseurl}/user`, userRoutes);
app.use(`${baseurl}/task`, taskRoute);

// Delay function
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Start the server
app.listen(PORT, async function () {
  console.log(`Connection successful on port ${PORT}`);
  connectDB();

  try {
    // Run tasks immediately when the server starts
    // await dispatchTaskPsalm();
    // await dispatchTaskCommunion();
    // sendSMSNotification();
    // console.log("All tasks processed and notifications sent.");
  } catch (error) {
    console.error("Error processing tasks:", error);
  }
});

// Optional: Schedule tasks to run periodically using node-cron
// Example: Run every day at 8 AM
cron.schedule("* * * * *", async () => {
  console.log("Running scheduled tasks...");
  try {
    await dispatchTaskPsalm();
    await dispatchTaskCommunion();
    console.log("Scheduled tasks completed.");
  } catch (error) {
    console.error("Error running scheduled tasks:", error);
  }
});

// import express from "express";
// import connectDB from "./Helpers/db.js";
// import cors from "cors";
// import cron from "node-cron";
// import userRoutes from "./src/Routes/UsersRoutes.js";
// import taskRoute from "./src/Routes/TasksRoutes.js";
// import { dispatchTaskCommunion, dispatchTaskPsalm } from "./Utils/Tasks.js";
// import { importExcelData } from "./Utils/fileutils.js";
// import { getNextTask } from "./src/Controller/TaskControlller.js";
// import { Notifications } from "./Utils/Notification.js";
// // import cloudinary from "./Helpers/Cloudinary.js";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import xlsx from "xlsx";
// import axios from "axios";
// import streamifier from "streamifier";

// // import cookieParser from "cookieparser";
// const app = express();
// const PORT = process.env.PORT || 4001;
// const image = "./src/image/IMG_20210125_131859_074.jpg";
// // middleware
// app.use(express.static("public"));
// app.use(express.json());
// app.use(cors());
// const baseurl = "/api/v1";
// app.use(`${baseurl}/user`, userRoutes);
// app.use(`${baseurl}/task`, taskRoute);
// //

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
// app.listen(PORT, function () {
//   // console.log(result);
//   console.log(`connection succesfull on port ${PORT}`);
//   connectDB();
//   //importExcelData();
//   // Notifications();
//   dispatchTaskPsalm();
//   // delay(4000);
//   dispatchTaskCommunion();
//   // cron.schedule("*/3 * * * *", dispatchTaskPsalm);
//   // cron.schedule("*/3 * * * *", dispatchTaskPsalm);
//   // cron.schedule("* * * * * ", dispatchTaskCommunion);
//   // cron.schedule("2-59/3 * * * *", dispatchTaskCommunion);
// });

// function doTask() {
//   console.log("Task Done 1");
//   dispatchTask();
//   // getNextTask();
// }
