const amqp = require('amqplib');
const {config} = require('../config');
module.exports = async () => {
  let result;
  try {
    result = await amqp.connect(config.RABBIT_HOST);
  } catch (e) {
    console.error(e);
  }
  return result.createChannel();
};
