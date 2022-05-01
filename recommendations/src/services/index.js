require('mongodb');
require('amqplib');
async function consumeViewedMessage(db, msgChan, msg) {
  console.log('consume a viewed message');
  const parsedMsg = JSON.parse(msg.content.toString());
  console.log(JSON.stringify(parsedMsg, null, 4));
  msgChan.ack(msg);
}

module.exports = {consumeViewedMessage};
