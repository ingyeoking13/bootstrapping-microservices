const express = require('express');
const http = require('http');
const {config} = require('./config');
const db = require('./db');
const mongodb = require('mongodb');
const fs = require('fs');
const app = express();
const port = config.APP_PORT || 3000;

app.get('/', async (req, res) => {
  res.send('Hello World');
});

app.get('/video', async (req, res) => {
  try {
    const videoPath = './videos/SampleVideo_1280x720_1mb.mp4';
    fs.stat(videoPath, (err, stats) => {
      if (err) {
        res.sendStatus(err);
        return;
      }
      res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': 'video/mp4',
      });
      fs.createReadStream(videoPath).pipe(res);
    });
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
    return;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
