const express = require('express');
const app = express();

const port = process.env.SERVER_PORT || 4000;

app.use(express.json());

app.get('/', (req, res, next) => {
  console.log('hello pern!');
  res.status(200).send('hello pern');
});

app.listen(port, () => console.log('server running on port ' + port));
