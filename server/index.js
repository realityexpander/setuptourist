const express = require('express');
const scrapers = require('./scrapers.js')
const app = express();
const port = 3000

const bodyParser = require('body-parser');

// const creators = []
const creators = [
  {channelName: 'Code Drip', avatarURL: 'https://yt3.ggpht.com/ytc/AAUvwnhtuLAm0s8db-mA2fuTOBqrlWxWCJeJDZEc0bcONw=s88-c-k-c0x00ffffff-no-rj'},
  {channelName: 'Nomad Capitalist', avatarURL: 'https://yt3.ggpht.com/ytc/AAUvwnhNnD05AILoIUArgd1ZHUpaNeEU27V8-h7lN7bq=s88-c-k-c0x00ffffff-no-rj'},
  {channelName: 'RT', avatarURL: 'https://yt3.ggpht.com/ytc/AAUvwnijYqNxgVUKWqoGcecybqhx7rkYODHYyS0so06S4A=s88-c-k-c0x00ffffff-no-rj'},
]

app.use(bodyParser.json())
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/creators', async (req, res) => {
  // todo get from db
  res.send(creators)
})

app.post('/creators', async (req, res) => {
  console.log("request:", req.body)
  // scrape channel
  const channelData = await scrapers.scrapeChannel(req.body.channelName)

  // add to db   
  if (channelData.channelName !== undefined) {
    creators.push(channelData)
  }
  res.send('success') 
})

app.listen(port, () => {
  console.log(`Youtube Scraper app listening at http://localhost:${port}`)
})
