import { test, expect, chromium } from '@playwright/test';

test.beforeEach( async ( {page} )=> {

    const browser= await chromium.launch();
    const context=await browser.newContext();
    
    await page.goto('https://showroom.arivis.com/#/login');
    await page.fill('#input-15', 'nazafarin');
    await page.fill('#input-18', 'arivis');
    await page.click('text=LOGIN');
    await expect(page).toHaveURL('https://showroom.arivis.com/#/');
    await page.click('div.v-card__title');
    await expect(page).toHaveURL('https://showroom.arivis.com/#/datasets');

});



test.describe( 'Mount an exsiting dataset', () => {

    test('Mount a dataset' , async({page}) => {

        await page.click('button.a-toolbar_left-action-menu_activator');
        await page.click('text=Mount existing dataset');
        await page.dblclick('text=_testdata');
        await page.dblclick('text=_nativeformats');
        await page.dblclick('text=czi');
        await page.dblclick('text=hcs');
        await page.click('text=next');
        await page.click('text=MOUNT DATASETS');
        await page.waitForSelector('span.success');

    });

  
     test('Search new registered dataset', async({page}) => {

        await page.fill('[placeholder="search..."]' , 'hcs');
        await page.click('a[title=hcs]');
        await page.screenshot({ path: 'screenshot6.png'});

    }); 

    test('Delete Dataset by keyboard' , async({page}) => {


        await page.click('text = hcs');
        await page.keyboard.press('Delete');
        await page.click('text=yes');

    })

  /*  test('Delete Dataset by ctx menu' , async ({page}) => {


        await page.click('text = hcs');
        await page.click('text=More');
        await page.click('text=Delete');
        await page.click('text=yes');


    }); */

});


test('Open Viewer For Dataset' , async ({page}) => {

    await page.dblclick('text=hcs');
    await page.click('i.fa-palette');
    await page.waitForSelector('div.iv_color-visibility__color');
    const elements = await page.$$('div.iv_color-visibility__color');
    const elementsItem1= await elements[0].textContent();
    expect(elementsItem1).toBe(' DAPI ');
    const elementsItem2= await elements[1].textContent();
     expect(elementsItem2).toBe(' EGFP ');
    

});

test.afterAll( async({browser}) => {

    await browser.close();

});
















//Login test

/*
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
    
    await page.dblclick('text=hcs');
    await page.dblclick('text=hcs');
    await expect(page).toHaveURL(imgUrl);
    await page.click('i.fa-palette');
    await page.screenshot({ path: 'screenshot5.png'});

    
}); */
  
  