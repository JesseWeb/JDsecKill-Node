import { logger } from "../log_setting/log"
import { GetOrderReqData } from "./GetOrderReqData"
import { GetSecKillInitInfo } from "./getSKInitInfo"
import { Global } from "./global"
import { getReq, postReq } from "./http"

export const ReqSubmitSKOrder = async () => {
   try {
      let skUrl = `https://marathon.jd.com/seckill/seckill.action?skuId=${Global.jsk.SkuId}&num=${Global.jsk.SecKillNum}&rid=${Math.floor(new Date().getTime() / 1000)}`
      logger.debug(`访问抢购订单结算页面......${skUrl}`)
      let res = await getReq(skUrl, null, "https://item.jd.com/" + Global.jsk.SkuId + ".html", true)
      logger.debug("获取抢购信息...............");
      await GetSecKillInitInfo()
      let orderData = GetOrderReqData()
      if (orderData) {
         logger.debug(orderData)
         try {
            let res = await postReq("https://marathon.jd.com/seckillnew/orderService/pc/submitOrder.action?skuId=" + Global.jsk.SkuId + "", orderData, skUrl, false)
            let orderId = res.data.orderId
            if (orderId != "" && orderId != "0") {
               Global.jsk.IsOk = true
               logger.debug(`抢购成功，订单编号：${orderId}`)
            }else{
               throw new Error(`抢购失败，再接再厉`)
            }
         } catch (error) {
            logger.debug(`订单提交失败，正在重新提交...
            errMsg=> ${error}`)
            await ReqSubmitSKOrder()
         }
      }

   } catch (error) {
      logger.debug(`抢购失败：${error}, 正在重试.......`)
      await ReqSubmitSKOrder()
      throw error
   }
}