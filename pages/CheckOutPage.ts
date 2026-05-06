import {Page} from '@playwright/test';
export class CheckOutPage{
   constructor(private page:Page) {}
   

   async gotoCheckout(){
    await this.page.locator('[data-test="checkout"]').click();
   }
  async fillForms(firstName: string, lastName: string, zipCode: string) {
  await this.page.getByPlaceholder('First Name').fill(firstName);
  await this.page.getByPlaceholder('Last Name').fill(lastName);
  await this.page.getByPlaceholder('Zip/Postal Code').fill(zipCode);
  await this.page.getByRole('button', { name: 'Continue' }).click();
}

async finishOrder() {
  await this.page.locator('[data-test="finish"]').click();
}
}