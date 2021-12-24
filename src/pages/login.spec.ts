import { test, expect, chromium } from '@playwright/test';


//Login test

test('login' , async ({page}) => {
    
  
    await page.goto('https://showroom.arivis.com/#/login');
    await page.fill('#input-15', 'nazafarin');
    await page.fill('#input-18', 'arivis');
    await page.click('text=LOGIN');
    await expect(page).toHaveURL('https://showroom.arivis.com/#/');
    await page.click('div.v-card__title');
    await expect(page).toHaveURL('https://showroom.arivis.com/#/datasets');

    await page.click('button.a-toolbar_left-action-menu_activator');
    await page.click('text=Mount existing dataset');
    await expect(page).toHaveURL('https://showroom.arivis.com/#/datasets/mount');
    await page.dblclick('text=_testdata');
    await page.dblclick('text=_nativeformats');
    await page.dblclick('text=czi');
    await page.dblclick('text=hcs');
    await page.click('text=next');
    await page.click('text=MOUNT DATASETS');
    await page.waitForSelector('span.success');
    await page.goto('https://showroom.arivis.com/#/datasets');
    await page.screenshot({ path: 'screenshot1.png'});

    
});
  
  