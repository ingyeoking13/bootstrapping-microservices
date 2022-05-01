const http = require('http');

function sendViewedMessage(videoPath) {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const requestBody = {
    videoPath: videoPath,
  };

  const req = http.request('http://history/viewed', postOptions);
  req.on('close', () => {
    console.log("Sent 'viewed' message to history microservice.");
  });
  req.on('error', () => {
    console.error("Failed to send 'viewed' message!");
    console.error((err && err.stack) || err);
  });
  req.write(JSON.stringify(requestBody));
  req.end();
}

module.exports = {sendViewedMessage};
