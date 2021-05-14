const express = require('express');
const app = express();

app.use(require('cors')());
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
  console.log('Press Ctrl+C to quit.');
});
 
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
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