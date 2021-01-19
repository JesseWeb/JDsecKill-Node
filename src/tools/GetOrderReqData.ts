import { logger } from "../log_setting/log"
import { Global } from "./global";

export const GetOrderReqData = () => {
   logger.debug(`生成订单所需参数...`);
   try {
      let addressList: Array<any> = Global.jsk.SecKillInfo?.addressList
      let defaultAddress = addressList.find((item) => {
         return item.defaultAddress == true
      })
      if (defaultAddress) {
         logger.debug(`获取到默认地址`);
      }
      if (defaultAddress == "") {
         logger.debug("没有获取到默认收货地址， 自动选择一个地址")
         defaultAddress = addressList[0]
      }
      let invoiceInfo = Global.jsk.SecKillInfo.invoiceInfo;
      let data = {
         "skuId": Global.jsk.SkuId,
         "num": Global.jsk.SecKillNum,
         "addressId": defaultAddress.id,
         "yuShou": "true",
         "isModifyAddress": "false",
         "name": defaultAddress.name,
         "provinceId": defaultAddress.provinceId,
         "cityId": defaultAddress.cityId,
         "countyId": defaultAddress.countyId,
         "townId": defaultAddress.townId,
         "addressDetail": defaultAddress.addressDetail,
         "mobile": defaultAddress.mobile,
         "mobileKey": defaultAddress.mobileKey,
         "email": defaultAddress.email,
         "postCode": "",
         "invoiceTitle": "",
         "invoiceCompanyName": "",
         "invoiceContent": "",
         "invoiceTaxpayerNO": "",
         "invoiceEmail": "",
         "invoicePhone": invoiceInfo.invoicePhone,
         "invoicePhoneKey": invoiceInfo.invoicePhoneKey,
         "invoice": "true",
         "password": "",
         "codTimeType": "3",
         "paymentType": "4",
         "areaCode": "",
         "overseas": "0",
         "phone": "",
         "eid": Global.jsk.eid,
         "fp": Global.jsk.fp,
         "token": Global.jsk.SecKillInfo.token,
         "pru": "",
      }
      if (invoiceInfo) {
         data["invoice"] = "false"
      } else {
         data["invoice"] = "true"
      }
      let t = invoiceInfo["invoiceTitle"]
      if (t != "") {
         data["invoiceTitle"] = t
      } else {
         data["invoiceTitle"] = "-1"
      }

      t = invoiceInfo["invoiceContentType"]
      if (t != "") {
         data["invoiceContent"] = t
      } else {
         data["invoiceContent"] = "1"
      }
      return data
   } catch (error) {
      logger.debug(`订单参数错误: ${error}`)
   }
}