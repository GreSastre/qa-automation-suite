import { test, expect } from "@playwright/test";
test("multitab", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/windows");
  const [nuevaPestana] = await Promise.all([
    page.waitForEvent("popup"), // espera a que se abra una pestaña nueva
    page.getByRole("link", { name: "Click here" }).click(), // la acción que la dispara
  ]);

  await nuevaPestana.waitForLoadState();
  await expect(nuevaPestana).toHaveTitle("New Window");
});
