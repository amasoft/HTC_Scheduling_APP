import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;
import qrcodeTerminal from "qrcode-terminal";
import dotenv from "dotenv";
import qrcode from "qrcode";
import { dispatchTaskCommunion, dispatchTaskPsalm } from "./Tasks.js";
import twilio from "twilio";
import { v2 as cloudinary } from "cloudinary";
import cron from "node-cron"; // ✅ Added missing import
import puppeteer from "puppeteer";

dotenv.config();

let client;
let isInitialized = false;

//console.log()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize the WhatsApp client
export async function initializeWhatsappClient() {
  console.log("isInitialized..." + isInitialized);

  if (isInitialized) {
    console.log("WhatsApp client is already initialized");
    return client;
  }
  client = new Client({
   
    puppeteer: {
      puppeteer,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // ✅ required for Render
      userDataDir: "./session_data", // 👈 this is the key
    },
  });
  client.on("qr", async (qr) => {
    console.log("QR code received, generating...");

    qrcodeTerminal.generate(qr, { small: true });

    // Save and upload QR to Cloudinary
    const filePath = "qr.png";
    await qrcode.toFile(filePath, qr);

    try {
      const uploadResponse = await cloudinary.uploader.upload(filePath, {
        folder: "HTC_DATA_scan",
      });
      console.log("✅ QR Upload Successful:", uploadResponse.secure_url);
    } catch (error) {
      console.error("❌ Failed to upload QR to Cloudinary:", error);
    }
  });

  client.on("ready", () => {
    isInitialized = true;
    console.log("✅ WhatsApp Client is ready!");

    // Schedule cron tasks every minute
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
    // console.log("📩 Message Received:", mes.body);
  });

  client.on("disconnected", async (reason) => {
    console.log(`⚠️ Client disconnected due to: ${reason}`);
    isInitialized = false;
    try {
      await client.destroy();
      client = null;
      console.log("Reinitializing client...");
      await initializeWhatsappClient();
    } catch (error) {
      console.error("Error during reinitialization:", error);
    }
  });

  try {
    await client.initialize();
    console.log("✅ WhatsApp Client initialized successfully");
    console.log("Client Info:", client.info);
    return client;
  } catch (err) {
    isInitialized = false;
    console.error("❌ Failed to initialize WhatsApp Client:", err);
    throw err;
  }
}

// Getter for the client (ensure it's initialized first)
export function getClient() {
  if (!client)
    throw new Error(
      "WhatsApp client not initialized. Call initializeWhatsappClient() first."
    );
  return client;
}

// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

// Generate QR code for authentication
// Function to send notifications to a WhatsApp group
async function Notifications(message) {
  const client = getClient(); // Will throw if client isn't ready
  console.log("Sending message:", message);
  // console.log("Notifications Clients:", client);
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
      console.log("chat.name>>  " + chat.name);
      // return chat.isGroup && chat.name === "Testing"; // Ensure the group name matches exactly
      return chat.name === "Testing"; // Ensure the group name matches exactly
    });

    if (group) {
      // Send the message to the group
      await client.sendMessage(group.id._serialized, message);
      console.log("Message sent to group:", group.name);

      //try sending personal message
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
