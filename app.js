import express from "express";
import connectDB from "./Helpers/db.js";
import cors from "cors";
import cron from "node-cron";
import userRoutes from "./src/Routes/UsersRoutes.js";
import taskRoute from "./src/Routes/TasksRoutes.js";
import { getClient, initializeWhatsappClient } from "./Utils/Notification.js";
import { dispatchTaskCommunion, dispatchTaskPsalm } from "./Utils/Tasks.js";
import dotenv from "dotenv";

import { Notifications } from "./Utils/Notification.js";
dotenv.config();
// import { sendSMSNotification } from "./Utils/Notification.js";
const app = express();
const PORT = process.env.PORT || 8080;
console.log("app:MONGO_URI from env:", process.env.MONGO_URl);
console.log("app:PORT from env:", process.env.PORT);

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const baseurl = "/api/v1";
app.use(`${baseurl}/user`, userRoutes);
app.use(`${baseurl}/task`, taskRoute);
app.get("/health", (req, res) => res.sendStatus(200));
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.listen(PORT, async function () {
  console.log(`Server is running on port ${PORT}`);
  connectDB();

  try {
    // Initialize client
    initializeWhatsappClient();
  } catch (error) {
    console.error("Initialization error:", error);
  }
});
