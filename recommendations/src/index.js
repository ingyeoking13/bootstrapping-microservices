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
  res.send(`Hello World I'm recommendations!`);
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
