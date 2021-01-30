const puppeteer = require('puppeteer');

async function scrapeChannel(ytChannelUrlName) {
  const ytChannelUrl = `https://www.youtube.com/c/${ytChannelUrlName}`
  
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(ytChannelUrl)

  const el = await page.$('#channel-name #text')
  if (el == null) {
    console.log(`Invalid channel URL name: ${ytChannelUrlName}`)
    return {}
  }
  const text = await el.getProperty('textContent')
  const ytChannelName = await text.jsonValue()
  
  const [el2] = await page.$x('//*[@id="img"]')
  const src = await el2.getProperty('src')
  const ytImgUrl = await src.jsonValue()

  browser.close()
  
  console.log("scraped:", {ytChannelName, ytImgUrl, ytChannelUrl, ytChannelUrlName })
  return {ytChannelName, ytImgUrl, ytChannelUrl, ytChannelUrlName}
}

module.exports = {
  scrapeChannel
}

// test fn
// scrapeChannel('https://www.youtube.com/c/codedrip')