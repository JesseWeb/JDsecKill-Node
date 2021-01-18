import { logger } from "../log_setting/log"
import { getRandomNum } from "./getRandomNum"
import { Global } from "./global"
import { getReq } from "./http"

export const fetchSKLing = async () => {
   /*jsk.SecKillUrl = "https://marathon.jd.com/captcha.html?skuId="+jsk.SkuId+"&sn=c3f4ececd8461f0e4d7267e96a91e0e0&from=pc"*/
   logger.debug(`开始获取抢购链接....`)
   Global.jsk.SecKillUrl
   let res = await getReq(`https://itemko.jd.com/itemShowBtn`, {
      "callback": "jQuery" + getRandomNum(1000000, 9999999),
      "skuId": Global.jsk.SkuId,
      "from": "pc",
      "_": String(new Date().getTime()),
   }, `https://item.jd.com/${Global.jsk.SkuId}.html`,true)
   let url = res.request.protocol + '//'+res.request.host+res.request.path
   if (url) {
      Global.jsk.SecKillUrl = url.replace(/device/g, 'marathon') || url
      Global.jsk.SecKillUrl = url.replace(/user_routing/g, 'captcha.html')
      logger.debug(`抢购连接获取成功....
      ${Global.jsk.SecKillUrl}`)
      return
   } else {
      await fetchSKLing()
   }
}