import { Global } from './tools/global';
import { logger } from './log_setting/log';
import { madePage } from './opt/madePage'
import { login } from './opt/login'
import { getEipFq } from './tools/getEipFp';
import { config } from './config'
import moment from 'moment'
import { SyncJdTime } from './tools/SyncJdTime';
import { waitForStart } from './opt/waitForStart';
import { fetchSKLing } from './tools/fetchSKLink';
import { getReq } from './tools/http';
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
      await fetchSKLing()
      logger.debug("正在访问抢购连接......")
      let req = await getReq(Global.jsk.SecKillUrl, null, "https://item.jd.com/" + Global.jsk.SkuId + ".html", true)
      //这里访问会响应302 禁止重定向后就会是空数据 所以这里空数据是正常的
      if (req.data == null) {

      }
      logger.debug(Global.jsk.SecKillUrl)
   } catch (error) {
      logger.debug(error)
      process.exit(-1)
   }
})();