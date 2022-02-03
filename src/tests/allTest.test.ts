import { test, expect, chromium} from '@playwright/test';
import DatasetPage from '../pages/dataset.page';
import viewMenuPage from '../pages/viewMenu.page';



let DataSet: DatasetPage;
let view_menu: viewMenuPage;

//Group Test: Mount, Channel Test, Search, Delete, Change plane

test.describe('all tests', () =>{
  test.use({storageState:'./storageState.json'});
  
  

  test.beforeEach(async({page})=>{

    DataSet= new DatasetPage(page);
    view_menu= new viewMenuPage(page);
    await page.goto('https://showroom.arivis.com/#/');
    await page.click('div.v-card__title');
    await expect(page).toHaveURL('https://showroom.arivis.com/#/datasets');

  })

  test('Mount a dataset' , async({page}) => {

    await page.waitForSelector('text=hcs' , {timeout:5000})
    const beforMount= (await DataSet.countelehcs).length;
    await DataSet.clickeleDown();
    await page.click('text=Mount existing dataset');
    await expect(page).toHaveURL('https://showroom.arivis.com/#/datasets/mount');
    await page.dblclick('text=_testdata');
    await page.dblclick('text=_nativeformats');
    await page.dblclick('text=czi');
    await page.dblclick('text=hcs');
    await page.click('text=next');
    await page.click('text=MOUNT DATASETS');

    // check dataset was successfully registered
    await page.waitForSelector('span.success');
    await page.click('text=close');
    await expect(page).toHaveURL('https://showroom.arivis.com/#/datasets');
    await page.waitForSelector('text=hcs', {timeout:7000});
    const afterMount= (await DataSet.countelehcs).length;
    


    if (afterMount-beforMount==1) {
      console.log('register!');
      console.log(beforMount);
      console.log(afterMount);
      
    }

    
    
    });

  
     test('Search new registered dataset', async({page}) => {

        
        DataSet.enterSearch('hcs');
        await page.click('a[title=hcs]');
        

    }); 

    test('Delete Dataset by keyboard' , async({page}) => {

      await page.waitForTimeout(5000);
      const beforDelete=(await DataSet.countelehcs).length;
      DataSet.clickelehcs();
      await page.waitForTimeout(5000);
      await page.keyboard.press('Delete');
      await page.click('text= YES ');
      const afretDelete= (await DataSet.countelehcs).length;

      if(beforDelete-afretDelete==1){ 

        console.log("deleted!");
        console.log(beforDelete);
        console.log(afretDelete);
        }

    })

//     test('Delete Dataset by ctx menu' , async ({page}) => {
    


//       DataSet.clickelehcs();
//       const beforDelete=(await DataSet.countelehcs).length;
//       DataSet.clickelemore();
//       await page.click('text=Delete');
//       await page.click('text= YES ');
//       const afretDelete= (await DataSet.countelehcs).length;

//       if(afretDelete>beforDelete){

//         console.log("deleted!");
//         console.log(beforDelete);
//         console.log(afretDelete);
//         }


//     });




  test('Open Viewer For Dataset' , async ({page}) => {


    DataSet.dbclickelehcs();
    view_menu.clickeleChannelSetting();
    await page.waitForSelector('div.iv_color-visibility__color');

     //check that channel visibility panel is filled with 2 channels with the correct name

    const elements = await page.$$('div.iv_color-visibility__color');
    const elementsItem1= await elements[0].textContent();
    expect(elementsItem1).toBe(' DAPI ');
    const elementsItem2= await elements[1].textContent();
    expect(elementsItem2).toBe(' EGFP ');
    

 });

  //check that changing current plane in Dimensions panel triggers image reloads for Navigator panel and Viewer

test('changing current plane' , async ({page}) => {


    DataSet.dbclickelehcs();
    await page.waitForNavigation();
    view_menu.clickeleNavigation();
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'screenshot1.png'});
    await page.click('text=plane 2 >> i');
    await page.waitForTimeout(5000);
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
})

test.afterAll( async({browser}) => {
    
    await browser.close();

});

  