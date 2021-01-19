import puppeteer, { Cookie } from 'puppeteer'
interface I_Confit {
   page: puppeteer.Page
   isLogin: boolean
   isClose: boolean
   userAgent: string
   UserInfo: object | null
   SkuId: string
   SecKillUrl: string
   SecKillNum: number
   SecKillInfo: any
   eid: string
   fp: string
   Works: number
   IsOk: boolean
   StartTime: Date
   DiffTime: number
   PayPwd: string,
   cookies: Cookie[]
}

export class Global {
   static jsk: I_Confit
}