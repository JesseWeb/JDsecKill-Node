import { Global } from "./global"
import { postReq } from "./http"

export const GetSecKillInitInfo = async () => {
   try {
      let res = await postReq(
         'https://marathon.jd.com/seckillnew/orderService/pc/init.action',
         {
            "sku": Global.jsk.SkuId,
            "num": Global.jsk.SecKillNum,
            "isModifyAddress": "false",
         },
         `https://marathon.jd.com/seckill/seckill.action?skuId=${Global.jsk.SkuId}&num=${Global.jsk.SecKillNum}&rid=${Math.floor(new Date().getTime() / 1000)}`, false
      )
      Global.jsk.SecKillInfo = res.data
   } catch (error) {
      throw error
   }
}