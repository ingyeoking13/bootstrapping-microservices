const dotenv = require('dotenv');
dotenv.config();

const config = {
  VIDEO_STORAGE_PORT: process.env.VIDEO_STORAGE_PORT,
  VIDEO_STORAGE_HOST: process.env.VIDEO_STORAGE_HOST,
  APP_PORT: process.env.APP_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
};

module.exports = {config};
