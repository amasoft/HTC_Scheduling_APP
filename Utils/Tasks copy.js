import {
  fetchNextTask,
  getNextTask,
} from "../src/Controller/TaskControlller.js";
import { Notifications } from "./Notification.js";
async function dispatchTaskPsalm() {
  const task_type = "Psalmist";
  const tasks = await fetchNextTask(task_type);
  //for single functions
  // tasks.map((task, id) => {
  //   // sendmail("1234", task.user.email);
  //   const name = `${task.user.surname} ${task.user.firstname}`;
  //   const taskDate = new Date(`${task.DueDate}`).toDateString();
  //   const taskRole = task.Role;
  //   const getMessage = singleUser(name, taskDate, taskRole);
  //   Notifications(getMessage);
  // });

  await Promise.all(
    tasks.map(async (task) => {
      try {
        const name = `${task.user.surname} ${task.user.firstname}`;
        // const taskDate = new Date(`${task.DueDate}`).toDateString();
        const taskRole = task.Role;
        const getMessage = await singleUser(name, "", taskRole);
        console.log("");
        // await Notifications(getMessage);
        /// await client.sendMessage(chatId, `Task: ${task.description}`);
        console.log(`Task sent: ${task.user.surname}`);
        // await delay(7000); // Wait 3 seconds before sending the next message
      } catch (error) {
        console.error(`Error sending task: ${task.user.surname}`, error);
      }
    })
  );

  console.log("All tasks processed.");

  // // const name = `${task[0].user.surname} ${task[0].user.firstname}`;
  // // const taskDate = new Date(`${task[0].DueDate}`).toDateString();
  // // const taskRole = task[0].Role;
  // // const getMessage = singleUser(name, taskDate, taskRole);
  // Notifications(getMessage);
}

async function dispatchTaskCommunion() {
  const task_type = "Communion";
  const tasks = await fetchNextTask(task_type);
  //for single functions
  // tasks.map((task, id) => {
  //   // sendmail("1234", task.user.email);
  //   const name = `${task.user.surname} ${task.user.firstname}`;
  //   const taskDate = new Date(`${task.DueDate}`).toDateString();
  //   const taskRole = task.Role;
  //   const getMessage = singleUser(name, taskDate, taskRole);
  //   Notifications(getMessage);
  // });

  await Promise.all(
    tasks.map(async (task) => {
      try {
        const name = `${task.user.surname} ${task.user.firstname}`;
        const taskDate = new Date(`${task.DueDate}`).toDateString();
        const taskRole = task.Role;
        const getMessage = await singleUser(name, "", taskRole);
        await Notifications(getMessage);
        /// await client.sendMessage(chatId, `Task: ${task.description}`);
        console.log(`Task sent: ${task.user.surname}`);
        // await delay(7000); // Wait 3 seconds before sending the next message
      } catch (error) {
        console.error(`Error sending task: ${task.user.surname}`, error);
      }
    })
  );

  console.log("All tasks processed.");

  // // const name = `${task[0].user.surname} ${task[0].user.firstname}`;
  // // const taskDate = new Date(`${task[0].DueDate}`).toDateString();
  // // const taskRole = task[0].Role;
  // // const getMessage = singleUser(name, taskDate, taskRole);
  // Notifications(getMessage);
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function singleUser(name, date, role) {
  const message = `Dear ${name} kindly Note that you have a special Lithurgical Function with the following details:     
  date:${date}
  function : ${role}

  we wish you the best
  `;
  return message;
}
// const message = `Dear ${thisUser.user.surname} ${thisUser.user.firstname} kindly Note that you have a special Lihurgical Function with following details:

export { dispatchTaskPsalm, dispatchTaskCommunion };
