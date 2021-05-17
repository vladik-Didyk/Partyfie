require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

app.post('/', (req, res) => {
    res
      .status(200)
      .send('Hello, world!')
      .end();
  });
app.put('/', (req, res) => {
    res
      .status(200)
      .send('Hello, world!')
      .end();
  }); 
