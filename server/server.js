const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const sessionRouter = require("./routes/session");

app.use(require("cors")());

app.use(express.json());
app.use("/session", sessionRouter);
io.on("connection", (socket) => {
  socket.on("message", ({ username, chatMessage }) => {
    io.emit("message", { username, chatMessage });
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
