import {chromium,expect,FullConfig } from '@playwright/test';
import LoginPage from './src/pages/login.page';
let loginpage: LoginPage

async function globalSetup(config: FullConfig) {
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginpage= new LoginPage(page);
  await page.goto('https://showroom.arivis.com/#/login');
  loginpage.login('nazafarin','arivis');
  await expect(page).toHaveURL('https://showroom.arivis.com/#/');
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: './storageState.json' });

  await browser.close();
}





export default globalSetup;

// import { Browser, chromium, FullConfig } from '@playwright/test'
 
// async function globalSetup (config: FullConfig) {
//   const browser = await chromium.launch()
//   await saveStorage(browser, 'Standard', 'Person', 'storage/user.json')
//   await saveStorage(browser, 'Admin', 'User', 'storage/admin.json')
//   await browser.close()
// }
 
// async function saveStorage (browser: Browser, firstName: string, lastName: string, saveStoragePath: string) {
//   const page = await browser.newPage()
//   await page.goto('http://webdriverjsdemo.github.io/auth/')
//   await page.type('#firstname', firstName)
//   await page.type('#surname', lastName)
//   await page.click('#ok')
//   await page.context().storageState({ path: saveStoragePath })
// }
 
// export default globalSetup