const puppeteer = require('puppeteer');

async function scrapeChannel(channelName) {
  const channelURL = `https://www.youtube.com/c/${channelName}`
  
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(channelURL)

  const el = await page.$('#channel-name #text')
  const text = await el.getProperty('textContent')
  const name = await text.jsonValue()
  
  const [el2] = await page.$x('//*[@id="img"]')
  const src = await el2.getProperty('src')
  const avatarURL = await src.jsonValue()

  browser.close()
  
  console.log({name, avatarURL})
  return {name, avatarURL}
}

module.exports = {
  scrapeChannel
}

// test fn
// scrapeChannel('https://www.youtube.com/c/codedrip')