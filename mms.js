const twilio = require('twilio');

const accountSid = 'AC42661db5227293326b8fec88d2a5f9f4'; // Your Account SID from www.twilio.com/console
const authToken = '0036159ac127fe864399985d08dfc0f6';   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

client.messages.create({
    to: '+14165797485',  // Text this number
    from: '+12264551302',
    body:'Unregistered face detected, unlock door for unknown user?'
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


 



