import puppeteer from 'puppeteer'
export const madePage = async () => {
   const browser = await puppeteer.launch({
      headless: false,
      args: [
         '--window-size=1200,980'
      ],
   });
   const page = await browser.newPage();
   page.setViewport({
      width: 1200,
      height: 980
   })
   return page
}