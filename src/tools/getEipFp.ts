import puppeteer from 'puppeteer'
import { logger } from '../log_setting/log'
import { sleep } from './sleep'
export const getEipFq = async (page: puppeteer.Page) => {
   logger.debug(`正在获取eid和fp参数....`)
   await page.goto(`https://search.jd.com/Search?keyword=衣服`, { waitUntil: 'networkidle0' })
   const element = await page.$$('.gl-item');
   let skuId = await page.$eval('.gl-item',
      function (el) {
         return el.getAttribute('data-sku')
      })
   await page.goto(`https://item.jd.com/${skuId}.html`)
   logger.debug("正在加入购物车....")
   await Promise.all([
      page.waitForNavigation(),
      page.click('#InitCartUrl', {
         button: 'left'
      })
   ])
   logger.debug("正在前往购物车....")

   await Promise.all([
      page.waitForNavigation(),
      await page.click('#GotoShoppingCart', {
         button: 'left'
      })
   ])
   let url = page.url()
   logger.debug(`正在提交订单`)
   if (url.search(`cart.jd.com/cart_index`) > -1) {
      await Promise.all([
         page.waitForNavigation(),
         page.click('.common-submit-btn', {
            button: 'left'
         })
      ]);

   } else {
      await Promise.all([
         page.waitForNavigation(),
         page.click('.submit-btn', {
            button: 'left'
         })
      ]);

   }
   logger.debug("正在从页面获取eip fq5....")

   // await page.waitForNavigation({
   //    waitUntil: 'domcontentloaded'
   // })
   await sleep(3000)
   let eidFp: any = await page.evaluate(`window._JdTdudfp`)
   if (!eidFp) throw new Error('获取eid fp失败')
   try {
      eidFp = JSON.parse(eidFp)
      // global.jsk.eid = eidFp.eid
      // global.jsk.fp = eidFp.fp
   } catch (error) {
      throw new Error('获取eid fp失败')
   }
   logger.debug(`获取到eid：${eidFp.eid}
   fp:${eidFp.fp}`)

   // logger.debug(global.jsk)

   // await element.click();
   // if (!items)
   // throw new Error('获取eid中：获取商品列表失败')
}