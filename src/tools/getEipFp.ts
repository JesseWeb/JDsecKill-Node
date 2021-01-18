import { Global } from './global';
import puppeteer from 'puppeteer'
import { logger } from '../log_setting/log'
import { sleep } from './sleep'
export const getEipFq = async (page: puppeteer.Page) => {
   logger.debug(`正在获取eid和fp参数....`)
   await page.goto(`https://search.jd.com/Search?keyword=衣服`, { waitUntil: 'networkidle0' })
   let skuId = await page.$eval('.gl-item',
      function (el) {
         return el.getAttribute('data-sku')
      })
   await page.goto(`https://item.jd.com/${skuId}.html`)
   logger.debug("正在加入购物车....")
   page.waitForSelector(`#InitCartUrl`)
   page.click('#InitCartUrl', {
      button: 'left'
   })
   logger.debug("正在前往购物车....")
   await page.waitForTimeout(3000)
   await page.click('#GotoShoppingCart', {
      button: 'left'
   })
   logger.debug(`正在提交订单`)
   await page.waitForNavigation()
   await page.waitForTimeout(3000)
   let url = page.url()
   if (url.search(`cart.jd.com/cart_index`) > -1) {
      // await page.waitForSelector(`a.common-submit-btn`)
      await page.click('a.common-submit-btn', {
         button: 'left'
      })
   } else {
      // await page.waitForSelector(`.submit-btn`)
      await page.click('.submit-btn', {
         button: 'left'
      })

   }
   logger.debug("正在从页面获取eip fq5....")

   // await page.waitForNavigation({
   //    waitUntil: 'domcontentloaded'
   // })
   await sleep(3000)
   let eidFp: any = await page.evaluate(`window._JdTdudfp`)
   if (!eidFp) throw new Error('获取eid fp失败')
   if (typeof eidFp != "object") {
      try {
         eidFp = JSON.parse(eidFp)
         // global.jsk.eid = eidFp.eid
         // global.jsk.fp = eidFp.fp
      } catch (error) {
         console.log(error);
         throw new Error('获取eid fp失败')
      }
   }
   logger.debug(`获取到eid：${eidFp.eid}
   fp:${eidFp.fp}`)
   Global.jsk.eid = eidFp.eid
   Global.jsk.fp = eidFp.fp
   // logger.debug(global.jsk)

   // await element.click();
   // if (!items)
   // throw new Error('获取eid中：获取商品列表失败')
}