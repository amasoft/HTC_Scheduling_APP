const { error } = require("console");
const twilio = require("twilio");
const dotenv = require("dotenv");

module.exports.sendSMS = (req, res, next) => {
  console.log(0, dotenv.config());
  console.log(1, process.env.ACCOUNT_SSID);
  console.log(0, process.env.AUT_TOKEN);
  const accountssid = process.env.ACCOUNT_SSID;
  const autToken = process.env.AUT_TOKEN;

  const client = new twilio(accountssid, autToken);

  // const fromNumber = "+15177934255";// prevoiusly
  const fromNumber = process.env.FROM_NUMBER; // currently
  const receipentNumber = "+2349060834999";
  client.messages
    .create({
      body: "this is a test from twilio node js ",
      from: fromNumber,
      to: receipentNumber,
    })
    .then((message) => console.log("message sent succesfully"))
    .catch((error) => console.log("error sending message ", error));
};
module.exports.makeCall = (req, res, next) => {
  const accountssid = process.env.ACCOUNT_SSID;
  const autToken = process.env.AUT_TOKEN;
  const client = new twilio.Twilio(accountssid, autToken);
  const toPhoneNumber = "+2349060834999"; // Phone number to call
  const fromPhoneNumber = fromNumber; // Your Twilio phone number
  // Make a call
  client.calls
    .create({
      url: "http://demo.twilio.com/docs/voice.xml", // A URL for Twilio to fetch instructions (you can replace this with your own XML or TwiML)
      to: toPhoneNumber,
      from: fromPhoneNumber,
    })
    .then((call) => console.log(`Call SID: ${call.sid}`))
    .catch((error) => console.error(error));
};
