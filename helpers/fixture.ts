import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

type MyFixtures = {
  authenticatedPage: any;
  invalidUserLogin: any;
  lockedUserLogin: any;
};

export const test = base.extend<MyFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await use(page);
  },
  invalidUserLogin: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("usuario_falso", "secret_sauce");
    await use(page);
  },
  lockedUserLogin: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("locked_out_user", "secret_sauce");
    await use(page);
  },
});

export { expect } from "@playwright/test";
