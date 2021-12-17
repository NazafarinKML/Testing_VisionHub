import { test, expect } from '@playwright/test';

/*test('basic test', async ({ page }) => {
  await page.goto('http://showroom.arivis.com/');

});*/


test.beforeEach(async ({ page }) => {
    // Runs before each test and signs in each page.
    await page.goto('https://showroom.arivis.com/#/login');
   // await page.click('text=Login');
    await page.fill('#input-15', 'nazafarin');
    await page.fill('#input-18', 'arivis');
    await page.click('text=LOGIN');
  });
  
  test('first', async ({ page }) => {
    // page is signed in.
    
    //await page.screenshot({ path: 'screenshot.png' });
    await page.locator('#submit').click();
  });
  
/* test('second', async ({ page }) => {
    // page is signed in.
  }); */