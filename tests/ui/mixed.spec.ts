import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CheckOutPage } from "../../pages/CheckOutPage";

test.describe("Mixed UI + API tests", () => {
  test("verificar usuario por API y luego hacer login por UI", async ({
    page,
    request,
  }) => {
    // Paso 1 — verificar que el usuario existe por API
    const apiResponse = await request.get("/api/users/2");
    expect(apiResponse.status()).toBe(200);
    const { data } = await apiResponse.json();
    expect(data.email).toBeTruthy();

    // Paso 2 — hacer login por UI con ese usuario
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory/);

    // Paso 3 — agregar producto al carrito por UI
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProduct();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

    // Paso 4 — completar la orden
    await inventoryPage.gotoCart();
    const checkoutPage = new CheckOutPage(page);
    await checkoutPage.gotoCheckout();
    await checkoutPage.fillForms("Gre", "Sastre", "32807");
    await checkoutPage.finishOrder();
    await expect(page.locator('[data-test="complete-header"]')).toHaveText(
      "Thank you for your order!",
    );
  });

  test("crear usuario por API y verificar respuesta", async ({ request }) => {
    // Paso 1 — crear usuario por API
    const response = await request.post("/api/users", {
      data: {
        name: "Gre",
        job: "QA Automation Engineer",
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe("Gre");
    expect(body.job).toBe("QA Automation Engineer");
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();

    // Paso 2 — teardown: borrar el usuario creado
    const deleteResponse = await request.delete(`/api/users/${body.id}`);
    expect(deleteResponse.status()).toBe(204);
  });
});
