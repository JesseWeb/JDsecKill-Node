import { Global } from './tools/global';
import { logger } from './log_setting/log';
import { madePage } from './opt/madePage'
import { login } from './opt/login'
import { getEipFq } from './tools/getEipFp';
import { config } from './config'
import moment from 'moment'
import { SyncJdTime } from './tools/SyncJdTime';
import { waitForStart } from './opt/waitForStart';
import { fetchSKLink } from './tools/fetchSKLink';
import { getReq } from './tools/http';
import { ReqSubmitSKOrder } from './tools/reqSubmitSKOrder';
(async () => {
   try {
      let page = await madePage()
      Global.jsk = {
         page: page,
         isLogin: false,
         isClose: false,
         userAgent: "",
         SkuId: config.SkuId,
         SecKillNum: config.SecKillNum,
         Works: config.Works,
         IsOk: false,
         UserInfo: null,
         SecKillUrl: '',
         DiffTime: 0,
         PayPwd: '',
         SecKillInfo: null,
         StartTime: new Date(moment().format('YYYY-MM-DD ' + config.startTime)),
         eid: config.eid,
         fp: config.fp,
         cookies: []
      }
      await SyncJdTime()
      await login(page)
      await getEipFq(page)
      await waitForStart()
      logger.debug("正在访问抢购连接......")
      await page.goto("https://item.jd.com/" + Global.jsk.SkuId + ".html")
      // await page.waitForNavigation()
      while (true) {
         await fetchSKLink()
         let req = await getReq(Global.jsk.SecKillUrl, null, "https://item.jd.com/" + Global.jsk.SkuId + ".html", true)
         //这里访问会响应302 禁止重定向后就会是空数据 所以这里空数据是正常的
         // 'jQuery4607002({"type":"3","state":"12","st":1611021600,"en":1611023400,"url":"//divide.jd.com/user_routing?skuId=100012043978&sn=170d22ec7aae7552a78bf743c9de22f7&from=pc"})\n'
         // if (req.status == 302) {
         //    break
         // }
         if(req.data){
            break
         }
         // if (req.data) {
         //    let r = req.data.replace(/jQuery[0-9]+\(/, "")
         //    r = r.replace(/\)\\n/, '')
         //    let j = JSON.parse(r)
         //    if (j.url) break
         // }
      }
      while (true) {
         try {
            await ReqSubmitSKOrder()
            break
         } catch (error) {

         }
      }
      // logger.debug(Global.jsk.SecKillUrl)
   } catch (error) {
      logger.debug(error)
      process.exit(-1)
   }
})();