import { test, expect } from "@playwright/test";
test("iframe", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/iframe");
  await page.waitForLoadState("networkidle"); // espera a que dejen de llegar peticiones de red

  const frame = page.frameLocator("#mce_0_ifr");
  await frame.locator("body").click();
  await frame.locator("body").pressSequentially("Mi texto de prueba");
  await expect(frame.locator("body")).toHaveText("Mi texto de prueba");
});
