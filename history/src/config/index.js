const dotenv = require('dotenv');
dotenv.config();

const config = {
  APP_PORT: process.env.APP_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  RABBIT_HOST: process.env.RABBIT_HOST,
};

module.exports = {config};
