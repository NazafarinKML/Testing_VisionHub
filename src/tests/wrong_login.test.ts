
import { test, expect, chromium} from '@playwright/test';
import LoginPage from '../pages/login.page';

let loginpage: LoginPage


    test.use({storageState: undefined});

test('wrong Login' , async({browser}) =>{

    
    const context= await browser.newContext();
    const page = await context.newPage();
    loginpage= new LoginPage(page);
    await page.goto('https://showroom.arivis.com/#/login');
    await loginpage.login('nazafarin', 'nazafarin');
    const pageUrl= page.url();
   //expect(pageUrl).toBe('https://showroom.arivis.com/#/login');
   if(pageUrl=='https://showroom.arivis.com/#/login')
   {
       console.log('login failed!');
   }
   await browser.close();
    
})

