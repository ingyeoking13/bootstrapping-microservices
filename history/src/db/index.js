const mongodb = require('mongodb');
const {config} = require('../config');

module.exports = async () => {
  try {
    const client = await mongodb.MongoClient.connect(config.DB_HOST);
    const db = client.db(config.DB_NAME);
    return db;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
