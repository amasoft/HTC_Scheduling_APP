// download-chromium.js
import puppeteer from "puppeteer";

try {
    console.log("Using Puppeteer version:", puppeteer.version);
    console.log("Using Puppeteer version:", puppeteer.executablePath());

  const browser = await puppeteer.launch();
  console.log("✅ Chromium downloaded and launched successfully");
  await browser.close();
} catch (err) {
  console.error("❌ Failed to download Chromium:", err);
  process.exit(1);
}
