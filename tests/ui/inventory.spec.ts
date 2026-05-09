import { test, expect } from "./fixture";

test("ver productos con login automatico", async ({ authenticatedPage }) => {
  await expect(authenticatedPage.getByText("Products")).toBeVisible();
});
test("verificar cantidad de productos", async ({ authenticatedPage }) => {
  const products = authenticatedPage.locator(".inventory_item");
  await expect(products).toHaveCount(6);
});

test("agregar producto al carrito", async ({ authenticatedPage }) => {
  await authenticatedPage
    .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    .click();
  await expect(authenticatedPage.locator(".shopping_cart_badge")).toHaveText(
    "1",
  );
});
