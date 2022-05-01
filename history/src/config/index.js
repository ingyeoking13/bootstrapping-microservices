const dotenv = require('dotenv');
dotenv.config();

const config = {
  APP_PORT: process.env.APP_PORT,
};

module.exports = {config};
