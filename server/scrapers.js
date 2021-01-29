const puppeteer = require('puppeteer');

async function scrapeChannel(name) {
  const channelURL = `https://www.youtube.com/c/${name}`
  
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(channelURL)

  const el = await page.$('#channel-name #text')
  if (el == null) {
    console.log(`Invalid channel name: ${name}`)
    return {}
  }
  const text = await el.getProperty('textContent')
  const channelName = await text.jsonValue()
  
  const [el2] = await page.$x('//*[@id="img"]')
  const src = await el2.getProperty('src')
  const avatarURL = await src.jsonValue()

  browser.close()
  
  console.log({channelName, avatarURL})
  return {channelName, avatarURL}
}

module.exports = {
  scrapeChannel
}

// test fn
// scrapeChannel('https://www.youtube.com/c/codedrip')