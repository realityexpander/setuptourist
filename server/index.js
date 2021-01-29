const express = require('express');
const app = express();
const port = 3000

const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/creators', async (req, res) => {
  const creators = [
    {name: 'Code Drip', img: 'https://'},
    {name: 'Dave Lee', img: 'https://'},
    {name: 'MKBHD', img: 'https://'},
  ]

  // todo get from db
  res.send(creators)
})

app.post('/creators', async (req, res) => {
  console.log(req.body)
  // todo: scrape channel
  // todo: add to db
  res.send('success')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
