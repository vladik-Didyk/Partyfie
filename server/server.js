<<<<<<< HEAD
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
=======
const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
>>>>>>> main
});

const sessionRouter = require("./routes/session");

app.use(require("cors")());

app.use(express.json());
app.use("/session", sessionRouter);

io.on("connection", (socket) => {
  console.log("Connected");

  socket.on("play", (playMsg) => {
    io.emit("play", playMsg);
  });
  socket.on("stop", (msg) => io.emit("stop"));
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

<<<<<<< HEAD
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
=======
app.get("/", (req, res) => {
  res.status(200).send("Hello, world!").end();
});
>>>>>>> main
