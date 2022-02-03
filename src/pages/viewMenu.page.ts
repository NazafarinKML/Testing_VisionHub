import { Page } from "playwright" ;

export default class viewMenuPage{

    private page: Page;

    constructor(page:Page){

        this.page=page;

    }

    public async eleNavigation(){

        await this.page.waitForSelector('div[title="Navigation"]')
        const navigationBtn = this.page.$('div[title="Navigation"]');
  
        if (navigationBtn != null){
            
          return navigationBtn;
        }
        else throw new Error("element can't find!");
  
      }
  
      public async elechannelSetting(){
  
          await this.page.waitForSelector('div[title="Channel Settings"]')
          const channelSetting = this.page.$('div[title="Channel Settings"]');
    
          if (channelSetting != null){
              
            return channelSetting;
          }
          else throw new Error("element can't find!");
    
        }
        public async clickeleNavigation(){

    
            const ele=  await this.eleNavigation();
            await ele?.click();
        
        }
        
        public async clickeleChannelSetting(){
        
            const ele= await this.elechannelSetting();
            await ele?.click();
        
        }


}