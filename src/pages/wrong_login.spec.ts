
import { test, expect, chromium} from '@playwright/test';

test('wrong Login' , async({page}) =>{


    const browser= await chromium.launch();
    const context=await browser.newContext();
    await page.goto('https://showroom.arivis.com/#/login');
    await page.fill('#input-15', 'nazafarin');
    await page.fill('#input-18', 'nazafarin');
    await page.click('text=LOGIN');
    await page.waitForTimeout(10000)
    const pageUrl= page.url();
    expect(pageUrl).toBe('https://showroom.arivis.com/#/login');
    console.log('Login Fail');
    await browser.close();
    
})
