# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\saucedemo.spec.ts >> Flujo de compra en Saucedemo >> redireccion correcta despues del login
- Location: tests\ui\saucedemo.spec.ts:91:7

# Error details

```
Error: page.waitForURL: Target page, context or browser has been closed
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Test source

```ts
  1   | import { LoginPage } from "../../pages/LoginPage";
  2   | import { InventoryPage } from "../../pages/InventoryPage";
  3   | import { CheckOutPage } from "../../pages/CheckOutPage";
  4   | import { MenuPage } from "../../pages/MenuPage";
  5   | import users from "../../test-data/users.json";
  6   | import { test, expect } from "../../helpers/fixture";
  7   | test.describe("Login-Sauce demo", () => {
  8   |   test("Login Exitoso", async ({ page }) => {
  9   |     const loginPage = new LoginPage(page);
  10  |     await loginPage.goto();
  11  |     await loginPage.login("standard_user", "secret_sauce");
  12  |     await expect(page).toHaveURL(/inventory/);
  13  |   });
  14  | });
  15  | test("login exitoso con datos externos", async ({ page }) => {
  16  |   const loginPage = new LoginPage(page);
  17  |   await loginPage.goto();
  18  |   await loginPage.login(users.validUser.username, users.validUser.password);
  19  |   await expect(page).toHaveURL(/inventory/);
  20  | });
  21  | 
  22  | test("login fallido con usuario invalido - datos externos", async ({
  23  |   page,
  24  | }) => {
  25  |   const loginPage = new LoginPage(page);
  26  |   await loginPage.goto();
  27  |   await loginPage.login(users.invalidUser.username, users.invalidUser.password);
  28  |   await expect(page.getByTestId("error")).toContainText(
  29  |     "Username and password do not match",
  30  |   );
  31  | });
  32  | 
  33  | test("login fallido con usuario bloqueado - datos externos", async ({
  34  |   page,
  35  | }) => {
  36  |   const loginPage = new LoginPage(page);
  37  |   await loginPage.goto();
  38  |   await loginPage.login(users.lockedUser.username, users.lockedUser.password);
  39  |   await expect(page.getByTestId("error")).toContainText("locked out");
  40  | });
  41  | 
  42  | //Test fallido co usuario incorrecto
  43  | test("Login Fallido", async ({ invalidUserLogin }) => {
  44  |   await expect(invalidUserLogin.getByTestId("error")).toContainText(
  45  |     "Username and password do not match",
  46  |   );
  47  | });
  48  | 
  49  | //test fallidos con campos vacios
  50  | test("Login Fallido-campos vacios", async ({ page }) => {
  51  |   const loginPage = new LoginPage(page);
  52  |   await loginPage.goto();
  53  |   await loginPage.login("", "");
  54  |   await expect(page.getByTestId("error")).toBeVisible();
  55  | });
  56  | 
  57  | //test para usuario bloqueado
  58  | test("Login Fallido-Usuario bloqueado", async ({ lockedUserLogin }) => {
  59  |   await expect(lockedUserLogin.getByTestId("error")).toContainText(
  60  |     "locked out",
  61  |   );
  62  | });
  63  | 
  64  | test.describe("Flujo de compra en Saucedemo", () => {
  65  |   // agregar producto al carrito
  66  |   test("Pedido Exitso", async ({ authenticatedPage }) => {
  67  |     const inventoryPage = new InventoryPage(authenticatedPage);
  68  |     const checkoutPage = new CheckOutPage(authenticatedPage);
  69  |     //Agregar producto al carrito
  70  |     await inventoryPage.addProduct("sauce-labs-backpack");
  71  | 
  72  |     //verificar que el carrito no este vacio
  73  |     await expect(authenticatedPage.locator(".shopping_cart_badge")).toHaveText(
  74  |       "1",
  75  |     );
  76  | 
  77  |     //ir al carrito de compra
  78  |     await inventoryPage.gotoCart();
  79  | 
  80  |     //ir a checkout
  81  |     await checkoutPage.gotoCheckout();
  82  |     //rellenar campos de datos
  83  |     await checkoutPage.fillForms("Gre", "Sastre", "32807");
  84  |     await checkoutPage.finishOrder();
  85  |     //verificar que se hizo la orden correctamente
  86  |     await expect(authenticatedPage.getByTestId("complete-header")).toHaveText(
  87  |       "Thank you for your order!",
  88  |     );
  89  |   });
  90  | 
  91  |   test("redireccion correcta despues del login", async ({
  92  |     authenticatedPage,
  93  |   }) => {
  94  |     const menuPage = new MenuPage(authenticatedPage);
  95  |     await menuPage.openMenu();
  96  |     await menuPage.logOut();
> 97  |     await authenticatedPage.waitForURL(/inventory/);
      |                             ^ Error: page.waitForURL: Target page, context or browser has been closed
  98  |     await expect(authenticatedPage.getByText("Products")).toBeVisible();
  99  |   });
  100 | 
  101 |   test("logout", async ({ authenticatedPage }) => {
  102 |     await authenticatedPage.getByRole("button", { name: "Open Menu" }).click();
  103 |     await authenticatedPage.getByTestId("logout-sidebar-link").click();
  104 |     await expect(authenticatedPage).toHaveURL(/saucedemo/);
  105 |     await expect(authenticatedPage.getByText("Swag Labs")).toBeVisible();
  106 |   });
  107 | 
  108 |   test("filter", async ({ authenticatedPage }) => {
  109 |     const inventoryPage = new InventoryPage(authenticatedPage);
  110 |     await inventoryPage.filterProducts();
  111 |     const producto = authenticatedPage
  112 |       .locator(".inventory_item_name")
  113 |       .filter({ hasText: "Sauce Labs Onesie" });
  114 |     await expect(producto).toBeVisible();
  115 |   });
  116 | });
  117 | 
```