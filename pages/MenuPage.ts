import { Page } from "@playwright/test";
export class MenuPage {
  constructor(private page: Page) {}
  async logOut() {
    await this.page.getByRole("button", { name: "Open Menu" }).click();
    await this.page.getByTestId("logout-sidebar-link").click();
  }
}
