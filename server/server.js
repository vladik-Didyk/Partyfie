const express = require('express');
const { client } = require('./connect');
const sessionRouter = require('./routes/session');
const app = express();

app.use(require('cors')());

app.use(express.json());
app.use('/session', sessionRouter);
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});
