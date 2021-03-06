const express = require('express');
const http = require('http');
const {config} = require('./config');
const app = express();
const port = config.APP_PORT || 3000;
const dbLoader = require('./db');
const mqLoader = require('./mq');
const {consumeViewedMessage} = require('./services');
let db = null;
let mq = null;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Hello World I'm history!`);
});

app.post('/viewed', async (req, res) => {
  const videosCollections = db.collection('videos');
  const videoPath = req.body.videoPath;
  try {
    await videosCollections.insertOne({videoPath: videoPath});
    console.log(`Added ${videoPath} to history.`);
    res.sendStatus(200);
  } catch (e) {
    console.error(`Error adding video ${videoPath} to history.`);
    res.sendStatus(500);
  }
});

app.get('/history', async (req, res) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  try {
    const videosCollections = db.collection('videos');
    const documents = await videosCollections
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();
    res.json({history: documents});
  } catch (e) {
    console.error(`Error retrieving history from database.`);
    res.sendStatus(500);
  }
});

app.listen(port, async () => {
  try {
    db = await dbLoader();
    console.log('DB loaded.');
    mq = await mqLoader();
    await mq.assertExchange('viewed', 'fanout');
    const response = await mq.assertQueue('', {exclusive: true});
    const queueName = response.queue;
    console.log(`Created queue ${queueName}, binding it to viewed exchange.`);
    await mq.bindQueue(queueName, 'viewed', '');
    await mq.consume(queueName, (msg) => {
      consumeViewedMessage(db, mq, msg);
    });
    console.log('mq loaded.');
    console.log(`Example app listening on port ${port}`);
  } catch (e) {
    console.log(e);
    console.log('*o*');
  }
});
