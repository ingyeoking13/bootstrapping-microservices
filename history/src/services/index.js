require('mongodb');
require('amqplib');
async function consumeViewedMessage(db, msgChan, msg) {
  console.log('consume a viewed message');
  const videosCollection = db.collection('videos');
  const parsedMsg = JSON.parse(msg.content.toString());
  await videosCollection.insertOne({videoPath: parsedMsg.videoPath});
  msgChan.ack(msg);
}

module.exports = {consumeViewedMessage};
