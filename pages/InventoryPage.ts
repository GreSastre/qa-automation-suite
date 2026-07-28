import { Page } from "@playwright/test";
export class InventoryPage {
  constructor(private page: Page) {}

  async addProduct(productName: string) {
    await this.page.getByTestId(`add-to-cart-${productName}`).click();
  }

  async gotoCart() {
    await this.page.getByTestId("shopping-cart-link").click();
  }

  async filterProducts() {
    await this.page.getByTestId("product-sort-container").selectOption("lohi");
  }
}
