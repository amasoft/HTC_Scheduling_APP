import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import xlsx from "xlsx";
import { AddUser } from "../src/Controller/UserController.js";
import User from "../src/Model/Users.js";
import dotenv from "dotenv";

import { v2 as cloudinary } from "cloudinary";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const importExcelData = async () => {
  const filePath = "Data2.xlsx";
  try {
    console.log("📂 Reading Excel File...");
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Get first sheet
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    if (jsonData.length === 0) {
      console.log("❌ No data found in Excel file.");
      return;
    }

    console.log(`📊 Found ${jsonData.length} records. Processing...`);

    // 📌 Loop through each row and process
    const userPromises = jsonData.map(async (row) => {
      console.log("THE ROW" + JSON.stringify(row));
      console.log("THE ROW Surname" + row.Surname);
      try {
        // Upload profile picture if available
        let cloudinaryUrl = row.Photograph
          ? await uploadUserPicture(row.Photograph)
          : null;

        // Select only required fields
        return {
          surname: row.Surname.trim(),
          firstname: row.Othernames,
          email: `${row.Surname.split(" ")[0].trim().toLowerCase()}${
            row.Birthday.split("/")[0]
          }@gmail.com`
            .trim()
            .toLowerCase(),
          mobileNumber: row.PhoneNumber,
          gender: row.Gender,
          part: row.Part,
          dateOfBirth: row.Birthday,
          profile_pic: cloudinaryUrl, // Store Cloudinary URL
        };
      } catch (error) {
        console.error("❌ Error processing row:", error);
        return null;
      }
    });

    // Wait for all promises to resolve
    const processedUsers = await Promise.all(userPromises);

    // Filter out failed records
    const validUsers = processedUsers.filter((user) => user !== null);

    // console.log(
    //   `🚀 Upload Complete. Inserting ${validUsers.length} records into MongoDB...`
    // );
    console.log("FINAL USers" + JSON.stringify(validUsers));
    saveToExcel(validUsers, "processed_users.xlsx");

    // Insert into MongoDB
    const insertedUsers = await User.insertMany(validUsers, { ordered: false });
    console.log(`✅ Successfully inserted ${insertedUsers.length} users.`);
  } catch (error) {
    console.error("❌ Error importing Excel data:", error);
  }
};

function saveToExcel(data, fileName) {
  try {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Users");

    xlsx.writeFile(workbook, fileName);
    console.log(`✅ Successfully saved processed data to ${fileName}`);
  } catch (error) {
    console.error("❌ Error saving to Excel:", error);
  }
}

async function uploadUserPicture(driveLink) {
  try {
    const fileIdMatch = driveLink.match(/id=([^&]+)/);
    if (!fileIdMatch) {
      throw new Error("Invalid Google Drive link format.");
    }
    const fileId = fileIdMatch[1];

    const directUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    console.log("Uploading image...");

    const uploadResponse = await cloudinary.uploader.upload(directUrl, {
      folder: "HTC_DATA", // Folder in Cloudinary
    });

    console.log("✅ Upload Successful:", uploadResponse.secure_url);
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
  }
}

export { importExcelData };
