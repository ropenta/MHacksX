const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.post('/notifyUser', (req, res) => {
  const twiml = new MessagingResponse();
  //console.log('request body', req);
  //console.log('req.body.Body', req.body.Body);
  twiml.message('Unlocked door for registered user');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});