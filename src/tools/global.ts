interface I_Confit {
   page: any
   isLogin: boolean
   isClose: boolean
   userAgent: string
   UserInfo: object | null
   SkuId: string
   SecKillUrl: string
   SecKillNum: number
   SecKillInfo: object | null
   eid: string
   fp: string
   Works: number
   IsOk: boolean
   StartTime: Date
   DiffTime: number
   PayPwd: string
}

export class Global {
   static jsk:I_Confit
}