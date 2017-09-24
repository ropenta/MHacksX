require('dotenv').config()

const http = require('http');
const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');

const MessagingResponse = twilio.twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

let isAuthorized = false;
let count = 1;

let knownVisitor, addVisitor;



const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function outboundMMS(msg, mediaUrl) {
	count = count + 1;
	console.log(count, msg)
	client.messages.create({
		to: '+15174025378',  // Text this number
		from: '+12264551302',
		body: msg,
		mediaUrl: mediaUrl, //change this to public image url
	  }, function(error, message) {
	  count = count + 1;
	  if (!error) {
		console.log('MMS alert sent successfully!');
	  } else {
		console.log('Error sending MMS alert!');
	  }
	});
}

function outboundSMS(msg) {
	count = count + 1;
	console.log(count, msg)
	client.messages.create({
	to: '+15174025378',  // Text this number
	from: '+12264551302',
	body: msg,
	}, function(error, message) {
	  if (!error) {
		console.log('SMS alert sent successfully!');
	  } else {
		console.log('Error sending SMS alert!');
	  }
	});
}

function confirmNewUser(addNewUser) {
  if (addNewUser) {
	  outboundSMS('Authenticated new visitor on authorized guest list.');
  } else {
	  outboundSMS('New visitor not authenticated on updated guest list.');
  }
}

app.post('/notifyUser', (req, res) => {
  //const twiml = new MessagingResponse();
  console.log(count, req.body.Body)
  count = count + 1;
  let msg;
  const unlock = req.body.Body;
  if ( count == 2 ) {
    if (unlock.toLowerCase() === 'yes' && knownVisitor) {
	  msg = 'Unlocked door for authorized visitor.';
	  addVisitor = false;
    } else if (unlock.toLowerCase() === 'yes' && !knownVisitor) {
	  msg =  'Unlocked door for unrecognized visitor, would you like to add guest to authorized visitor group?';
	  addVisitor = true;
    } else {
	  msg = 'Door remains locked for unauthorized visitor';
	  addVisitor = false;
	}
	outboundSMS(msg);
  } else if (count == 4) {
    if (unlock.toLowerCase() === 'yes' && knownVisitor) {
	  msg = 'Unlocked door for authorized visitor.';
	  addVisitor = false;
    } else if (unlock.toLowerCase() === 'yes' && !knownVisitor) {
	  msg =  'Unlocked door for unrecognized visitor, would you like to add guest to authorized visitor group?';
	  addVisitor = true;
    } else {
	  msg = 'Door remains locked for unauthorized visitor.';
	  addVisitor = false;
	}
	outboundSMS(msg);
  } else if (count == 6) {
	confirmNewUser(addVisitor); 
  }    
  else if (count >= 6) {
	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end();
  }
  //twiml.message(msg);

  //res.end(twiml.toString());

});


http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
  let bodyText;
  if (isAuthorized) {
	bodyText = 'Registered face detected, would you like to unlock door for authorized visitor?';
	knownVisitor = true;
  } else {
	bodyText = 'Unregistered face detected, would you like to unlock door for unauthorized visitor';
	knownVisitor = false;
  }
  imageUrl = 'https://tctechcrunch2011.files.wordpress.com/2015/06/taylor-swift-apple-music1.png?w=645&zoom=2';
  outboundMMS(bodyText, imageUrl);
});

module.exports = app;