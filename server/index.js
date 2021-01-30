const express = require('express');
const scrapers = require('./scrapers.js')
const db = require('./db.js')
const app = express();
const port = 3000

app.use(express.json())
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/creators', async (req, res) => {
  const creators = await db.getAllCreators()
  console.log("GET:", creators)
  res.send(creators)
})

app.post('/creators', async (req, res) => {
  console.log("POST:", req.body )

  // scrape channel
  const channelData = await scrapers.scrapeChannel(req.body.ytChannelUrlName)

  console.log({channelData})

  // add to db   
  if (!isEmpty(channelData)) {
    await db.insertCreator( 
      channelData.ytChannelName, 
      channelData.ytImgUrl,
      channelData.ytChannelUrl,  
      req.body.ytChannelUrlName )

    res.send({
      ytChannelName : channelData.ytChannelName, 
      ytImgUrl : channelData.ytImgUrl, 
      ytChannelUrl : channelData.ytChannelUrl, 
      ytChannelUrlName : req.body.ytChannelUrlName
    })

  } else {
    res.send({})
  }

})

app.listen(port, () => {
  console.log(`Youtube Scraper app listening at http://localhost:${port}`)
})

function isEmpty(obj) { return (Object.keys(obj).length == 0) }