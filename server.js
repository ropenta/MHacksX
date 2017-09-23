require('dotenv').config()

const http = require('http');
const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');

const MessagingResponse = twilio.twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

const isAuthorized = true;

app.post('/notifyUser', (req, res) => {
  const twiml = new MessagingResponse();
  const locked = req.body.Body;
  if (locked.toLowerCase() === 'yes') {
	twiml.message('Unlocked door for registered user');
  } else {
	  twiml.message('Door remains locked for unauthorized user');
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
  const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  let bodyText;
  if (isAuthorized) {
	bodyText = 'Registered face detected, unlock door for authorized user?';
  } else {
	bodyText = 'Unregistered face detected, unlock door for unauthorized user?';
  }
  client.messages.create({
	to: '+15174025378',  // Text this number
	from: '+12264551302',
	body: bodyText,
	mediaUrl: 'https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg', //change this to public image url
  }, function(error, message) {
	  if (!error) {
		console.log('Alert sent successfully!');
	  } else {
		console.log('Error sending alert!');
	  }
	});
});

module.exports = app;