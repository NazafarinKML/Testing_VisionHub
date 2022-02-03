import { Page } from "playwright" ;


export default class DatasetPage{

    private page: Page;

    constructor(page:Page){

        this.page=page;

    }

    public get eleDown(){

        const downBtn = this.page.$('main span >> :nth-match(button, 2)');
  
        if (downBtn != null){
            
          return downBtn;
        }
        else throw new Error("element can't find!");
  
      }

      public async elehcs(){

      await this.page.waitForSelector('text=hcs');
        const hcs = this.page.$('text=hcs');
  
        if (hcs != null){
            
          return hcs;
        }
        else throw new Error("element can't find!");
  
      }

      public get countelehcs(){

        
        const counthcs=  this.page.$$('text=hcs');
  
        if (counthcs != null){
            
          return counthcs;
        }
        else throw new Error("element can't find!");
  
      }



      public get eleMore(){

        const more = this.page.$(':nth-match(button:has-text("More"), 2)');
  
        if (more != null){
            
          return more;
        }
        else throw new Error("element can't find!");
  
      }


      public get eleSearch(){

        const search = this.page.$('input[placeholder="search..."]');
  
        if (search != null){
            
          return search;
        }
        else throw new Error("element can't find!");
  
      }

public async clickeleDown(){

    const ele= await this.eleDown;
    await ele?.click();
    
    }


public async clickelemore(){

    const ele= await this.eleMore;
    await ele?.click();

}

public async clickelehcs(){

    const ele= await this.elehcs();
    await ele?.click();

}

public async dbclickelehcs(){

    const ele= await this.elehcs();
    await ele?.dblclick();

}

public async enterSearch(name: string){

    const ele= await this.eleSearch;
    await ele?.fill(name);

}



}