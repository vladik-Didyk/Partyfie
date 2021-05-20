const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const server = require("http").Server(app);
const cors = require("cors")
const SpotifyWebApi = require("spotify-web-api-node")
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const sessionRouter = require("./routes/session");

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '0a933f7d91e64b9096efbc218edaa4cc',
    clientSecret: '13ad59dfd3484f0e887defa8826edd2c',
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      console.log(data.body)
      res.json({ 
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
        refreshToken: data.body.refresh_token
      })
    })
    .catch(err => {   
      console.log(err)
      res.sendStatus(400)
    })
})


app.use(express.json());
app.use("/session", sessionRouter);
io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
  socket.on("song_queued", (track) => {
    io.emit("song_queued", track);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!").end();
});
