import { logger } from "../log_setting/log"
import { Global } from "../tools/global"
import moment from 'moment'
import { sleep } from "../tools/sleep"
export const waitForStart = async () => {
   let startTimeMs = Global.jsk.StartTime.getTime()
   logger.debug(`等待时间到达 ${moment(startTimeMs).format("HH:mm:ss")}.......请勿关闭浏览器`)
   while (true) {
      if (Global.jsk.page.isClosed()) throw new Error('浏览器被关闭，退出进程');
      let now = new Date().getTime() - Global.jsk.DiffTime
      if (now >= startTimeMs) {
         logger.debug(`时间到达，开始执行.... ${moment().format(`MM-DD HH:mm:ss`)}`)
         break
      }
      if (startTimeMs - now - 4 > 0) {
         await sleep(4)
      }
   }
}