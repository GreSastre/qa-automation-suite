import { test, expect } from "@playwright/test";

test("uploadfile", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");

  await page.locator("#file-upload").setInputFiles({
    name: "test.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("contenido de prueba"),
  });

  await page.locator("#file-submit").click();
  await expect(
    page.getByRole("heading", { name: "File Uploaded!" }),
  ).toBeVisible();
  await expect(page.locator("#uploaded-files")).toHaveText("test.txt");
});
