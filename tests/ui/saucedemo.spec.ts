import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CheckOutPage } from "../../pages/CheckOutPage";
import { MenuPage } from "../../pages/MenuPage";
import users from "../../test-data/users.json";
import { test, expect } from "../../helpers/fixture";
test.describe("Login-Sauce demo", () => {
  test("Login Exitoso", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);
  });
});
test("login exitoso con datos externos", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.validUser.username, users.validUser.password);
  await expect(page).toHaveURL(/inventory/);
});

test("login fallido con usuario invalido - datos externos", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.invalidUser.username, users.invalidUser.password);
  await expect(page.getByTestId("error")).toContainText(
    "Username and password do not match",
  );
});

test("login fallido con usuario bloqueado - datos externos", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.lockedUser.username, users.lockedUser.password);
  await expect(page.getByTestId("error")).toContainText("locked out");
});

//Test fallido co usuario incorrecto
test("Login Fallido", async ({ invalidUserLogin }) => {
  await expect(invalidUserLogin.getByTestId("error")).toContainText(
    "Username and password do not match",
  );
});

//test fallidos con campos vacios
test("Login Fallido-campos vacios", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("", "");
  await expect(page.getByTestId("error")).toBeVisible();
});

//test para usuario bloqueado
test("Login Fallido-Usuario bloqueado", async ({ lockedUserLogin }) => {
  await expect(lockedUserLogin.getByTestId("error")).toContainText(
    "locked out",
  );
});

test.describe("Flujo de compra en Saucedemo", () => {
  // agregar producto al carrito
  test("Pedido Exitso", async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    const checkoutPage = new CheckOutPage(authenticatedPage);
    //Agregar producto al carrito
    await inventoryPage.addProduct("sauce-labs-backpack");

    //verificar que el carrito no este vacio
    await expect(authenticatedPage.locator(".shopping_cart_badge")).toHaveText(
      "1",
    );

    //ir al carrito de compra
    await inventoryPage.gotoCart();

    //ir a checkout
    await checkoutPage.gotoCheckout();
    //rellenar campos de datos
    await checkoutPage.fillForms("Gre", "Sastre", "32807");
    await checkoutPage.finishOrder();
    //verificar que se hizo la orden correctamente
    await expect(authenticatedPage.getByTestId("complete-header")).toHaveText(
      "Thank you for your order!",
    );
  });

  test("redireccion correcta despues del login", async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.waitForURL(/inventory/);
    await expect(authenticatedPage.getByText("Products")).toBeVisible();
  });

  test("logout", async ({ authenticatedPage }) => {
    const menuPage = new MenuPage(authenticatedPage);

    await menuPage.logOut();
    await expect(authenticatedPage).toHaveURL(/saucedemo/);
    await expect(authenticatedPage.getByText("Swag Labs")).toBeVisible();
  });

  test("filter", async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);
    await inventoryPage.filterProducts();
    const producto = authenticatedPage
      .locator(".inventory_item_name")
      .filter({ hasText: "Sauce Labs Onesie" });
    await expect(producto).toBeVisible();
  });
});
