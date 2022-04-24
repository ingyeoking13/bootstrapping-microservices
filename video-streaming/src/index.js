const express = require('express');
const http = require('http');
const {config} = require('./config');

const app = express();
const port = config.APP_PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/video', (req, res) => {
  const forwardRequest = http.request(
    {
      host: config.VIDEO_STORAGE_HOST,
      port: config.VIDEO_STORAGE_PORT,
      path: `/video?path=${req.query.path}`,
      headers: req.headers,
      method: 'GET',
    },
    (_res) => {
      console.log(_res.statusCode, _res.headers);
      res.writeHeader(_res.statusCode, _res.headers);
      _res.pipe(res);
    }
  );
  req.pipe(forwardRequest);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
