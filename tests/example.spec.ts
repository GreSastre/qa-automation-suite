import { test, expect } from '@playwright/test';
test.describe('Login-Sauce demo', ()=>{

  test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test ('Login Exitoso', async({page}) => {

  
  await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', {name: 'Login'}).click();

  await expect(page).toHaveURL(/inventory/);


})
 //Test fallido co usuario incorrecto
test ('Login Fallido', async({page}) => {


  await page.getByPlaceholder('Username').fill('usuario_falso');

  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', {name: 'Login'}).click();

  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
})
 
//test fallidos con campos vacios 
test ('Login Fallido-campos vacios', async({page}) => {



  await page.getByRole('button', {name: 'Login'}).click();

  await expect(page.locator('[data-test="error"]')).toBeVisible(); 


})

//test para usuario bloqueado 
test ('Login Fallido-Usuario bloqueado', async({page}) => {

 

  await page.getByPlaceholder('Username').fill('locked_out_user');

  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', {name: 'Login'}).click();

  await expect(page.locator('[data-test="error"]')).toContainText('locked out');


 })
})


test.describe('Flujo de compra en Saucedemo', ()=>{
 
 
 //login 
  test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', {name: 'Login'}).click();

  await expect(page).toHaveURL(/inventory/);
});


// agregar producto al carrito 
test('Pedido Exitso', async({page})=>{
//Agregar producto al carrito
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

//verificar que el carrito no este vacio
await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

//ir al carrito de compra
await page.locator('[data-test="shopping-cart-link"]').click();

 //ir a checkout
 await page.locator('[data-test="checkout"]').click();
 //rellenar campos de datos 
await page.getByPlaceholder('First Name').fill('Gre');
await page.getByPlaceholder('Last Name').fill('Sastre');
await page.getByPlaceholder('Zip/Postal Code').fill('32807');
await page.getByRole("button", {name:'Continue'}).click();
await page.locator('[data-test="finish"]').click();
await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');


})

test('redireccion correcta despues del login', async ({ page }) => {

  await page.waitForURL(/inventory/);
  await expect(page.getByText('Products')).toBeVisible();
});




})
