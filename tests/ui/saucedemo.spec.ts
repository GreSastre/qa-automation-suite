import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CheckOutPage } from "../../pages/CheckOutPage";
test.describe("Login-Sauce demo", () => {
  test("Login Exitoso", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);
  });
});

//Test fallido co usuario incorrecto
test("Login Fallido", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("usuario_falso", "secret_sauce");

  await expect(page.locator('[data-test="error"]')).toContainText(
    "Username and password do not match",
  );
});

//test fallidos con campos vacios
test("Login Fallido-campos vacios", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("", "");
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

//test para usuario bloqueado
test("Login Fallido-Usuario bloqueado", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("locked_out_user", "secret_sauce");
  await expect(page.locator('[data-test="error"]')).toContainText("locked out");
});

test.describe("Flujo de compra en Saucedemo", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  // agregar producto al carrito
  test("Pedido Exitso", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckOutPage(page);
    //Agregar producto al carrito
    await inventoryPage.addProduct();

    //verificar que el carrito no este vacio
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

    //ir al carrito de compra
    await inventoryPage.gotoCart();

    //ir a checkout
    await checkoutPage.gotoCheckout();
    //rellenar campos de datos
    await checkoutPage.fillForms("Gre", "Sastre", "32807");
    await checkoutPage.finishOrder();
    //verificar que se hizo la orden correctamente
    await expect(page.locator('[data-test="complete-header"]')).toHaveText(
      "Thank you for your order!",
    );
  });

  test("redireccion correcta despues del login", async ({ page }) => {
    await page.waitForURL(/inventory/);
    await expect(page.getByText("Products")).toBeVisible();
  });

  test("logout", async ({ page }) => {
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveURL(/saucedemo/);
    await expect(page.getByText("Swag Labs")).toBeVisible();
  });

  test("filter", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.filterProducts();
    await expect(page.locator(".inventory_item_name").first()).toHaveText(
      "Sauce Labs Onesie",
    );
  });
});
