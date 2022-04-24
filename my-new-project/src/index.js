const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');
const {config} = require('./config');

const app = express();
const port = process.env.PORT || 3000;

const bucket_name = 'boocam-wiki';

const s3 = new AWS.S3({
  accessKeyId: config.AWS_AccessKeyId,
  secretAccessKey: config.AWS_SecretAccessKey,
  region: 'ap-northeast-2',
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/video', (req, res) => {
  const params = {
    Bucket: bucket_name,
    Key: req.query.path,
  };
  s3.getObject(params, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err,
      });
      return;
    }
  })
    .createReadStream()
    .pipe(res);
  res.writeHead(200, {
    'Content-Type': 'video/mp4',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
