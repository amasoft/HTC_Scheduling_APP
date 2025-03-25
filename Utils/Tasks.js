import { fetchNextTask } from "../src/Controller/TaskControlller.js";
import { Notifications, sendSMSNotification } from "./Notification.js";

// Delay function
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to format a message for a single user
async function singleUser(name, date, role) {
  const message = `Dear ${name}, kindly note that you have a  Liturgical function with the following details:

  Date: ${date}
  Function: ${role}

  We wish you the best!`;
  return message;
}

// Function to format a message for a multiple users
async function multipleUser(names, date, role) {
  const [user1, user2] = names;
  const message = `Dear ${user1}  and ${user2}, kindly note that you Both have a  Liturgical function with the following details:

  Date: ${date}
  Function: ${role}

  We wish you both all the best!`;
  return message;
}

// Dispatch tasks for Psalmist
async function dispatchTaskPsalm() {
  const task_type = "Psalmist";
  const tasks = await fetchNextTask(task_type);
  if (!tasks || tasks.length === 0) {
    console.log("NO DATA");

    return "No Data";
  }
  console.log("dispatchTaskPsalm", JSON.stringify(tasks));
  console.log("TASK LENGTH:::>" + tasks.length);
  if (tasks.length == 2) {
    const user1 = `${tasks[0].user.surname} ${tasks[0].user.firstname} `;
    const user2 = `${tasks[1].user.surname} ${tasks[1].user.firstname} `;
    console.log("TASK User1:::>" + user1);
    const taskDate = new Date(`${tasks[0].DueDate}`).toDateString();
    const taskRole = tasks[0].Role;
    const name = [user1, user2];
    const getMultipleMessages = await multipleUser(name, taskDate, taskRole);
    console.log("getMessage1:::>" + getMultipleMessages);
    // Send the message via Notifications
    await Notifications(getMultipleMessages);
    console.log(`multiple user Task sent:`);

    // Add a delay between messages (e.g., 3 seconds)
    await delay(3000);
  } else {
    for (const task of tasks) {
      try {
        const name = `${task.user.surname} ${task.user.firstname}`;
        const taskDate = new Date(`${task.DueDate}`).toDateString();
        const taskRole = task.Role;
        const getMessage = await singleUser(name, taskDate, taskRole);

        // Send the message via Notifications
        await Notifications(getMessage);
        console.log(`Task sent: ${task.user.surname}`);

        // Add a delay between messages (e.g., 3 seconds)
        await delay(3000);
      } catch (error) {
        console.error(`Error sending task: ${task.user.surname}`, error);
      }
    }
  }

  console.log("All Psalmist tasks processed.");
}

// Dispatch tasks for Communion
async function dispatchTaskCommunion() {
  console.log("Precommunn ");

  const task_type = "Pre-Communion Solo";
  const tasks = await fetchNextTask(task_type);
  if (!tasks || tasks.length === 0) {
    console.log("NO DATA");

    return "No Data";
  }
  console.log("TASK LENGTH:::>" + tasks.length);
  if (tasks.length == 2) {
    const user1 = `${tasks[0].user.surname} ${tasks[0].user.firstname} `;
    const user2 = `${tasks[1].user.surname} ${tasks[1].user.firstname} `;

    const user1_mobile = tasks[0].user.mobileNumber;
    const user2_mobile = tasks[1].user.mobileNumber;
    console.log("TASK User1:::>" + user1);
    const taskDate = new Date(`${tasks[0].DueDate}`).toDateString();
    const taskRole = tasks[0].Role;
    const name = [user1, user2];
    const getMultipleMessages = await multipleUser(name, taskDate, taskRole);
    console.log("getMessage1:::>" + getMultipleMessages);
    // const userPhoneNumber = task.user.mobileNumber;

    // Send the message via Notifications
    await Notifications(getMultipleMessages);

    await sendSMSNotification(getMultipleMessages, user1_mobile);
    await sendSMSNotification(getMultipleMessages, user2_mobile);

    console.log(`multiple user Task sent:`);

    // Add a delay between messages (e.g., 3 seconds)
    await delay(3000);
  } else {
    for (const task of tasks) {
      try {
        const name = `${task.user.surname} ${task.user.firstname}`;
        const taskDate = new Date(`${task.DueDate}`).toDateString();
        const taskRole = task.Role;
        const getMessage = await singleUser(name, taskDate, taskRole);
        const userPhoneNumber = task.user.mobileNumber;
        // Send the message via Notifications
        await Notifications(getMessage);
        await sendSMSNotification(getMessage, userPhoneNumber);
        // console.log(`Task sent: ${task.user.surname}`);

        // Add a delay between messages (e.g., 3 seconds)
        await delay(3000);
      } catch (error) {
        console.error(`Error sending task: ${task.user.surname}`, error);
      }
    }
  }

  console.log("All Psalmist tasks processed.");
}

export { dispatchTaskPsalm, dispatchTaskCommunion };

async function dispatchTaskCommunionggg() {
  const task_type = "Pre-Communion Solo";
  const tasks = await fetchNextTask(task_type);
  if (!tasks || tasks.length === 0) {
    console.log("NO DATA");
    return;
  }
  for (const task of tasks) {
    try {
      const name = `${task.user.surname} ${task.user.firstname}`;
      const taskDate = new Date(`${task.DueDate}`).toDateString();
      const taskRole = task.Role;
      const getMessage = await singleUser(name, taskDate, taskRole);

      // Send the message via Notifications
      await Notifications(getMessage);
      console.log(`Task sent: ${task.user.surname}`);

      // Add a delay between messages (e.g., 3 seconds)
      await delay(3000);
    } catch (error) {
      console.error(`Error sending task: ${task.user.surname}`, error);
    }
  }

  console.log("All Communion tasks processed.");
}
