const log4js = require("log4js");
import path from 'path'
let logPath = path.resolve(__dirname, '../logs/dev.log')
log4js.configure({
   appenders: {
      file: { type: "file", filename: logPath },
      console: {
         type: "console",
         categories: 'console'
      },
   },

   categories: { default: { appenders: ["file", 'console'], level: "DEBUG" } }
});

interface I_Logger {
   debug(str?: any): void
}
export const logger = log4js.getLogger("default") as I_Logger;
