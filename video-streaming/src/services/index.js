const http = require('http');
require('amqplib');

// mongo db로 넣으라고 direct messaging
function sendViewedMessage(videoPath) {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const requestBody = {
    videoPath: videoPath,
  };

  const req = http.request('http://history/viewed', postOptions);
  req.on('close', () => {
    console.log("Sent 'viewed' message to history microservice.");
  });
  req.on('error', () => {
    console.error("Failed to send 'viewed' message!");
    console.error((err && err.stack) || err);
  });
  req.write(JSON.stringify(requestBody));
  req.end();
}

// rabbitmq - indirective messaging
function sendViewedMessageMQ(mq, videoPath) {
  console.log('Publishing message on viewed queue.');

  const msg = {videoPath};
  const jsonMsg = JSON.stringify(msg);
  mq.publish('', 'viewed', Buffer.from(jsonMsg));
}

// rabbitmq - indirective messaging & exchange
function sendViewedMessageExchange(mq, videoPath) {
  console.log('Publishing message on viewed queue.');

  const msg = {videoPath};
  const jsonMsg = JSON.stringify(msg);
  mq.publish('viewed', '', Buffer.from(jsonMsg));
}

module.exports = {
  sendViewedMessage,
  sendViewedMessageMQ,
  sendViewedMessageExchange,
};
