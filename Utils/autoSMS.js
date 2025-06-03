import request from "request";

export const sendNotificationBySMS = async (mobile_number, message) => {
  console.log("sendNotificationBySMS>>" + message + "  " + mobile_number);

  var data = {
    // to: "2347880234567",
    // to: `${mobile_number}`,/
    // to: "2348021193234",
    // to: "2347063011279",
    to: "2347064795401",

    // to: mobile_number,
    from: "HTCSTJOHN",
    // sms: "Hi there, te
    // sting Termii",
    sms: `${message}`,
    type: "plain",
    api_key: "TLaxLhkupsqADlgnAfFAdSxaHZCYDGeveHBZDaquKaZqlUnTyjfvsabKehwlvR",
    channel: "generic",
    // channel: "dnd",
    media: {
      url: "https://media.example.com/file",
      caption: "your media file",
    },
  };
  var options = {
    method: "POST",
    // url: "https://BASE_URL/api/sms/send",
    url: "https://v3.api.termii.com/api/sms/send",
    headers: {
      "Content-Type": ["application/json", "application/json"],
    },
    body: JSON.stringify(data),
  };
  console.log("SMS PAYLOAD" + JSON.stringify(options));
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log("new response " + response.body);
  });
};
