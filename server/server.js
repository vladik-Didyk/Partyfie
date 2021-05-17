const express = require('express');
const sessionRouter = require('./routes/session');
const app = express();

app.use(require('cors')());
const server = require('http').createServer(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use('/session', sessionRouter);
 
const PORT = process.env.PORT || 8080;

io.on("connection", (socket) => {
  console.log("client connected");
});

server.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});
