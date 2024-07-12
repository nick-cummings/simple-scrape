import { chromium } from "playwright";

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

const url =
  "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wait-times.html";
await page.goto(url);

const inputElement = page.locator("input[name*=visawaittimes]");
await inputElement.click();
await inputElement.type("Managua");

const submitButtonElement = page.locator("input[type=submit][value=GO]");
await submitButtonElement.click();

await page.waitForTimeout(3000); // Wait for table to load

const tableRows = await page
  .locator("table[class*=visawaittimes] tbody tr")
  .all();
const tableData = await Promise.all(
  tableRows.map((row) => row.locator("td").allInnerTexts())
);

console.log("DATA:", tableData);

await browser.close();
