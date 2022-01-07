import { test, expect, chromium } from '@playwright/test';


// Login Befor Each Test

test.beforeEach( async ( {page} )=> {

    const browser= await chromium.launch();
    const context=await browser.newContext();
    await page.goto('https://showroom.arivis.com/#/login');
    await page.fill('#input-15', 'nazafarin');
    await page.fill('#input-18', 'arivis');
    await page.click('text=LOGIN');
    await expect(page).toHaveURL('https://showroom.arivis.com/#/');

    await Promise.all([
        page.waitForNavigation({ url: 'https://showroom.arivis.com/#/datasets' }),
        page.click('text=Datasets Manage your datasets. >> div')
      ]);

});

//Group Test: Mount, Chanel Test, Search, Delete, Change plane

test.describe( 'Mount an exsiting dataset', () => {

    test('Mount a dataset' , async({page}) => {

        await page.click('main span >> :nth-match(button, 2)');
        await Promise.all([
            page.waitForNavigation({ url: 'https://showroom.arivis.com/#/datasets/mount' }),
            page.click('text=Mount existing dataset')
          ]);

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
        

    }); 

    test('Delete Dataset by keyboard' , async({page}) => {


        await page.click('text = hcs');
        await page.keyboard.press('Delete');
        await page.click('text=yes');

    })

    test('Delete Dataset by ctx menu' , async ({page}) => {


        await page.click('text = hcs');
        await page.click('text=More');
        await page.click('text=Delete');
        await page.click('text=yes');


    });

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

test('changing current plane' , async ({page}) => {

    await page.dblclick('text=hcs');
    await page.click('.far.fa-compass');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshot1.png'});
    await page.click('text=plane 2 >> i');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshot2.png'});

    //check differents of two images

    const fs = require('fs');
    const PNG = require('pngjs').PNG;
    const pixelmatch = require('pixelmatch');
    const img1 = PNG.sync.read(fs.readFileSync('screenshot1.png'));
    const img2 = PNG.sync.read(fs.readFileSync('screenshot2.png'));
    const {width, height} = img1;
    const diff = new PNG({width, height});
    pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});
    fs.writeFileSync('diff.png', PNG.sync.write(diff));
    
})

test.afterAll( async({browser}) => {
    
    await browser.close();

});


  