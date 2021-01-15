import puppeteer from 'puppeteer';
import { logger } from '../log_setting/log';
let userInfoUrl = `passport.jd.com/user/petName/getUserInfoForMiniJd.action`
export let login = (page: puppeteer.Page): Promise<Object> => {
   return new Promise(async (resolve, rej) => {
      await page.goto('https://passport.jd.com/uc/login');
      logger.debug(`请扫码登陆`)
      await page.setRequestInterception(false)
      page.on('response', async (res) => {
         let url = res.url()
         if (url.search(userInfoUrl) > -1) {
            let userInfo;
            let response = await res.text()
            let regx = /jsonpUserinfo\(([\s\S]*)\)/
            let matching = response.match(regx)
            if (matching) {
               userInfo = JSON.parse(matching[1].replace(`jsonpUserinfo(`, ''))
               let realName = userInfo.realName
               logger.debug(`登陆成功：${realName}`)
            } else {
               rej('登陆失败，程序关闭')
            }
            resolve(userInfo)
         }
      })

   })
}


   // other actions...
   // await browser.close();
