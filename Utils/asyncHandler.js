import { error } from "console";

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.log("ASYNC ERROR" + error.message);
    res.status(500).json({ message: error.message });
  });
};

// function getNextSunday() {
//   const today = new Date();
//   const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
//   const daysUntilSunday = (7 - dayOfWeek) % 7 || 7; // Days to next Sunday
//   const nextSunday = new Date();
//   nextSunday.setDate(today.getDate() + daysUntilSunday);
//   console.log("DATA>>" + nextSunday.toISOString());
//   // return nextSunday.toDateString(); // Format the date
//   return nextSunday.toISOString().split("T")[0];
// }
export default asyncHandler;

// function getNextSunday() {
//   const today = new Date();
//   const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
//   const daysUntilSunday = (7 - dayOfWeek) % 7 || 7; // Days to next Sunday
//   const nextSunday = new Date();
//   nextSunday.setUTCDate(today.getUTCDate() + daysUntilSunday);

//   // Construct formatted date string manually
//   const year = nextSunday.getUTCFullYear();
//   const month = String(nextSunday.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
//   const day = String(nextSunday.getUTCDate()).padStart(2, "0");

//   return `${year}-${month}-${day}T00:00:00.000+00:00`;
// }
