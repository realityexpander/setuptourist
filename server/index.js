const express = require('express');
const scrapers = require('./scrapers.js')
const app = express();
const port = 3000

const bodyParser = require('body-parser');

const creators = []
// const creators = [
//   {name: 'Code Drip', img: 'https://'},
//   {name: 'Dave Lee', img: 'https://'},
//   {name: 'MKBHD', img: 'https://'},
// ]

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
  creators.push(channelData)
  res.send('success')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
