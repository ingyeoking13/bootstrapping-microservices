const express = require('express');
const http = require('http');
const {config} = require('./config');
const fs = require('fs');
const app = express();
const port = config.APP_PORT || 3000;

app.get('/', async (req, res) => {
  res.send('Hello World Hello hi');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
