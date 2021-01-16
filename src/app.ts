import { Global } from './tools/global';
import { logger } from './log_setting/log';
import { madePage } from './opt/madePage'
import { login } from './opt/login'
import { getEipFq } from './tools/getEipFp';
import { config } from './config'
import moment from 'moment'
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
         fp: config.fp
      }
      await login(page)
      await getEipFq(page)
      console.log(Global.jsk);
   } catch (error) {
      logger.debug(error)
      process.exit(-1)
   }
})();