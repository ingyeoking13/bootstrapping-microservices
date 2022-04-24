const dotenv = require('dotenv');
dotenv.config();

const config = {
  AWS_AccessKeyId: process.env.AWS_AccessKeyId,
  AWS_SecretAccessKey: process.env.AWS_SecretAccessKey,
  APP_PORT: process.env.APP_PORT,
};

module.exports = {config};
