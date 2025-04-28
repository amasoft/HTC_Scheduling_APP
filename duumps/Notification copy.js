// // const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
// import pkg from "whatsapp-web.js";
// const { Client, LocalAuth, MessageMedia } = pkg; // const qrcode = require("qrcode-terminal");
// import qrcode from "qrcode-terminal";
// import { fetchNextTask } from "../src/Controller/TaskControlller.js";
// // import image from "./";

// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

// client.on("qr", (qr) => {
//   console.log("Scan this QR code with WhatsApp:", qr);
// });

// client.on("ready", () => {
//   console.log("WhatsApp Client is ready!");
// });
// client.initialize();

// async function Notifications(message) {
//   console.log("AMADI" + message);
//   // const client = new Client({
//   //   authStrategy: new LocalAuth(),
//   // });

//   // client.on("qr", (qr) => {
//   //   console.log("Scan this QR code with WhatsApp:");
//   //   qrcode.generate(qr, { small: true });
//   // });

//   client.on("ready", async () => {
//     //   const groupName = "Testing";
//     //   console.log("Client is ready!");
//     //   console.log("ready to receive daa!");
//     const chats = await client.getChats();
//     //   console.log("Chats>>>");
//     // const imagePath = "./images/image.jpg"; // Replace with the path to your image

//     //   chats.map((chat) => {
//     //     console.log("chat>>>");
//     //     if (chat.lastMessage.id.participant) {
//     //       console.log("group" + chat.name);
//     //     }
//     //   });
//     // const media = MessageMedia.fromFilePath(imagePath);
//     // console.log("media" + media);
//     // const nextTaskUser = await fetchNextTask();
//     // var thisUser = nextTaskUser[0];
//     // console.log(8, nextTaskUser[0]);

//     // const recipientNumber = "2347064795401"; // Example: Nigeria's country code (234)
//     // const chatId = `${recipientNumber}@c.us`;
//     // await client.sendMessage(chatId, "Hello! This is a test message.");

//     const group = await chats.find((chat) => {
//       return chat.lastMessage?.id?.participant && chat.name === "Testing";
//     });

//     if (group) {
//       //get users for next task

//       // for sendinding media
//       //   await client.sendMessage(group.id._serialized, {
//       //     caption: `{@Middle Good morning All from arinze `,
//       //   });firstTask.user.firstname, firstTask.user.surname
//       // await client.sendMessage(
//       //   group.id._serialized,
//       //   `Dear ${thisUser.user.surname} ${thisUser.user.firstname} kindly Note that you have a special Lihurgical Function with following details:

//       //   date:Sunday ${thisUser.DueDate}'
//       //   function : ${thisUser.Role}

//       //   we wish you the best
//       //   `
//       // );
//       await client.sendMessage(group.id._serialized, message);
//       console.log("message sent to group ");
//     }
//     //   console.log(JSON.stringify(chats));
//   });

//   // client.initialize();
// }

// export { Notifications };
