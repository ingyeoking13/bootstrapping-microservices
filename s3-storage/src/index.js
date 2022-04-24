const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');
const {config} = require('./config');

const app = express();
const port = config.APP_PORT || 3000;

const bucket_name = 'boocam-wiki';

const s3 = new AWS.S3({
  accessKeyId: config.AWS_AccessKeyId,
  secretAccessKey: config.AWS_SecretAccessKey,
  region: 'ap-northeast-2',
});

app.get('/video', (req, res, next) => {
  console.log('answer : ' + req.query.path);
  const params = {
    Bucket: bucket_name,
    Key: req.query.path,
  };
  s3.headObject(params, (err, data) => {
    if (err) {
      next();
      return;
    }
    const stream = s3.getObject(params).createReadStream();
    stream.on('error', (err, next) => {
      return next();
    });
    stream.on('data', (chunk) => {
      console.log('this is the data from file', chunk);
    });

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', data.ContentLength);
    stream.on('end', (_) => {
      console.log('served by s3. ' + req.query.path);
    });
    stream.pipe(res);
  });

  return;
});

app.use((err, req, res, next) => {
  res.sendStatus(500).json({
    err: err,
  });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
