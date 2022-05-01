const express = require('express');
const app = express();

const mqLoader = require('./mq');
const {config} = require('./config');
const fs = require('fs');
const port = config.APP_PORT || 3000;
const {sendViewedMessageExchange} = require('./services');

let mq;

app.get('/', async (req, res) => {
  res.send('Hello World');
});

app.get('/video', (req, res) => {
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
      sendViewedMessageExchange(mq, videoPath);
    });
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
    return;
  }
});

app.listen(port, async () => {
  try {
    mq = await mqLoader();
    mq.assertExchange('viewed', 'fanout');
    console.log('connected to rabbit!');
    console.log(`Example app listening on port ${port}`);
  } catch (e) {
    console.log(e);
    console.log('*o*');
  }
});
