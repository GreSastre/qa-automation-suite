import {Page} from '@playwright/test';
export class InventoryPage{
   constructor(private page:Page) {}

   async addProduct(){
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
   }

   async gotoCart(){
    await this.page.locator('[data-test="shopping-cart-link"]').click();

   }

   async filterProducts(){
    await this.page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    

   }
}

  