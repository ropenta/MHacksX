const http = require('http');
const express = require('express');
const twilio = require('twilio');

//const router = require('./router');

const MessagingResponse = twilio.twiml.MessagingResponse;
//const AccessToken = twilio.AccessToken;

const app = express();
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(router);

app.post('/notifyUser', (req, res, next) => {
  const twiml = new MessagingResponse();
  //console.log('request body', req);
  //console.log('req.body.Body', req.body.Body);
  console.dir(req.body, { depth: 1 });
  twiml.message('Unlocked door for registered user');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');

	const accountSid = 'AC42661db5227293326b8fec88d2a5f9f4'; // Your Account SID from www.twilio.com/console
	const authToken = '0036159ac127fe864399985d08dfc0f6';   // Your Auth Token from www.twilio.com/console
	const client = new twilio(accountSid, authToken);

	client.messages.create({
		to: '+14165797485',  // Text this number
		from: '+12264551302',
		body:'Unregistered face detected, unlock door for unknown user?',
		mediaUrl: 'https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg',
	}, function(error, message) {
		// The HTTP request to Twilio will run asynchronously. This callback
		// function will be called when a response is received from Twilio
		// The "error" constiable will contain error information, if any.
		// If the request was successful, this value will be "falsy"
		if (!error) {
			// The second argument to the callback will contain the information
			// sent back by Twilio for the request. In this case, it is the
			// information about the text messsage you just sent:
			console.log('Success! The SID for this SMS message is:');
			console.log(message.sid);
	 
			console.log('Message sent on:');
			console.log(message.dateCreated);
		} else {
			console.log('Oops! There was an error.');
		}
	});
});

module.exports = app;