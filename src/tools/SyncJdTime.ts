import axios from "axios"
import { logger } from "../log_setting/log"
import { Global } from "./global"

export const SyncJdTime = async () => {
   try {
      let resp = await axios.get('https://a.jd.com//ajax/queryServerData.html')
      let jdTime = resp.data.serverTime
      Global.jsk.DiffTime = new Date().getTime() - jdTime
      logger.debug(`服务器与本地时间差为:${Global.jsk.DiffTime}ms`)
   } catch (error) {
      throw new Error('获取服务器时间失败')
   }

}