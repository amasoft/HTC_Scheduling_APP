import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import qrcodeTerminal from "qrcode-terminal";

import qrcode from "qrcode";
import { dispatchTaskCommunion, dispatchTaskPsalm } from "./Tasks.js";
import twilio from "twilio";
// Initialize the WhatsApp client

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "/tmp/.wwebjs_auth", // Railway allows writes to /tmp
  }),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage", // Prevents memory issues
      "--single-process", // Reduces resource usage
    ],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, // Only if using custom Chromium
  },
  restartOnCrash: true, // Auto-reconnect on failure
});

// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

// Generate QR code for authentication
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Scan this QR code with WhatsApp:");
});

// Log when the client is ready
client.on("ready", () => {
  console.log("WhatsApp Client is ready!");
  // dispatchTaskPsalm();
  // dispatchTaskCommunion();
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
});
client.on("message", (mes) => {
  console.log("message Received " + mes.body);
});

// Start the client
client.initialize().catch((err) => {
  console.log("Failed Initialization", err);
});
console.log("DATA REACHED HERE");
// Function to send notifications to a WhatsApp group
async function Notifications(message) {
  try {
    console.log("Sending message:", message);
    // console.log("Notifications:", client);
    if (!client.info) {
      console.error("Client is not ready or authenticated.");
      return;
    }
    // Get all chats
    const chats = await client.getChats();
    // console.log("CHATSSS>>" + JSON.stringify(chats));
    // Find the group by name
    const group = chats.find((chat) => {
      // console.log("GRoup>>  " + chat.isGroup);
      // console.log("chat.name>>  " + chat.name);
      // return chat.isGroup && chat.name === "Testing"; // Ensure the group name matches exactly
      return chat.name === "Testing"; // Ensure the group name matches exactly
    });

    if (group) {
      // Send the message to the group
      await client.sendMessage(group.id._serialized, message);
      console.log("Message sent to group:", group.name);
    } else {
      console.error("Group 'Testing' not found!");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

const sendSMSNotification = async (message, mobileNumber) => {
  // console.log(0, dotenv.config());
  // console.log(1, process.env.ACCOUNT_SSID);
  // console.log(0, process.env.AUT_TOKEN);
  const accountssid = process.env.ACCOUNT_SSID;
  const autToken = process.env.AUT_TOKEN;

  const client = new twilio(accountssid, autToken);

  // const fromNumber = "+15177934255";// prevoiusly
  const fromNumber = process.env.FROM_NUMBER; // currently
  const receipentNumber = mobileNumber;
  client.messages
    .create({
      body: message,
      from: fromNumber,
      to: receipentNumber,
    })
    .then((message) => console.log("patrick message sent succesfully"))
    .catch((error) => console.log("error sending message ", error));
};
// Export the Notifications function
export { Notifications, sendSMSNotification };
