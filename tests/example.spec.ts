import { test, expect } from '@playwright/test';
 
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

  await expect(page.getByText('Username and password do not match')).toBeVisible();


})
 
//test fallidos con campos vacios 
test ('Login Fallido-campos vacios', async({page}) => {



  await page.getByRole('button', {name: 'Login'}).click();

  await expect(page.getByText('Username is required')).toBeVisible();


})

//test para usuario bloqueado 
test ('Login Fallido-Usuario bloqueado', async({page}) => {

 

  await page.getByPlaceholder('Username').fill('locked_out_user');

  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', {name: 'Login'}).click();

  await expect(page.getByText('Sorry, this user has been locked out')).toBeVisible();


})