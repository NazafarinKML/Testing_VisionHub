import { Page } from "playwright" ;

export default class LoginPage{

    private page: Page;

    constructor(page:Page){

        this.page=page;

    }

    public async usernameEle(){

        await this.page.waitForSelector('#input-15');
        const usernameTxt= this.page.$('#input-15');
        if(usernameTxt!=null)
        {
            return usernameTxt;
        }
        else throw new Error("element can't find!");
    }

    public async passwordEle(){

        await this.page.waitForSelector('#input-18');
        const passwordTxt= this.page.$('#input-18');
        if(passwordTxt!=null)
        {
            return passwordTxt;
        }
        else throw new Error("element can't find!");
    }
    public async loginEle(){

        await this.page.waitForSelector('text=LOGIN')
        const loginBtn= this.page.$('text=LOGIN');
        if(loginBtn!=null)
        {
            return loginBtn;
        }
        else throw new Error("element can't find!");
    }

    public async login(username: string, password: string)
    {
        const user= await this.usernameEle();
        const pass=await this.passwordEle();
        await user?.fill(username);
        await pass?.fill(password);
        const loginClick=await this.loginEle();
        await loginClick?.click();

    }
}