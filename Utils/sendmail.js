import nodemailer from "nodemailer";
import axios from "axios";

const sendmail = async (verifycode, email) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amadifaraday@gmail.com",
      pass: "foympeqrkqmkukac",
    },
  });

  var mailOptions = {
    from: "amadifaraday@gmail.com",
    to: `${email}`,
    subject: "Account Verification",
    // text: "you have a new request for backend task ",
    html:
      "<h4>welcome </h4>" +
      `<p>below is the verification code  ${verifycode} request your backend service</p>`,
    // `<p>below is the details :</p>` +
    // `<p>Type of Project :${projectType}</p>` +
    // `<p>project Description :${projectDesc}</p>` +
    // `<p>Contact email :${email}</p>`,
  };

  const sendMail = transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return {
        error,
        message: "email not sent",
      };
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};
export const testsms = async () => {
  const data = {
    to: "2347064795401",
    from: "HTCSTJOHN",
    sms: "Hi there, testing Termii",
    type: "plain",
    api_key: "TLaxLhkupsqADlgnAfFAdSxaHZCYDGeveHBZDaquKaZqlUnTyjfvsabKehwlvR", // replace with your real Termii API key
    channel: "generic",
  };

  try {
    const response = await axios.post(
      "https://api.ng.termii.com/api/sms/send",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Information>>>" + response);
    console.log(response.data);
  } catch (error) {
    console.error("Error sending SMS:", error.response?.data || error.message);
  }
};
export default sendmail;
