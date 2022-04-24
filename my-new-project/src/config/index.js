const dotenv = require('dotenv');
dotenv.config();

const config = {
  AWS_AccessKeyId: process.env.AWS_AccessKeyId,
  AWS_SecretAccessKey: process.env.AWS_SecretAccessKey,
};

module.exports = {config};
