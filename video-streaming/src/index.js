const express = require('express');
const http = require('http');
const {config} = require('./config');
const db = require('./db');
const mongodb = require('mongodb');

const app = express();
const port = config.APP_PORT || 3000;

app.get('/', async (req, res) => {
  res.send('Hello World');
});

app.get('/video', async (req, res) => {
  try {
    const _db = await db();
    const videosCollection = _db.collection('videos');
    const videoId = new mongodb.ObjectId(req.query.id);
    const videoRecord = await videosCollection.findOne({_id: videoId});
    if (!videoRecord) {
      res.sendStatus(404);
      return;
    }
    const options = {
      host: config.VIDEO_STORAGE_HOST,
      port: config.VIDEO_STORAGE_PORT,
      path: `/video?path=${videoRecord.videoPath}`,
      headers: req.headers,
      method: 'GET',
    };
    const forwardRequest = http.request(options, (_res) => {
      console.log(_res.statusCode, _res.headers);
      res.writeHeader(_res.statusCode, _res.headers);
      _res.pipe(res);
    });
    req.pipe(forwardRequest);
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
