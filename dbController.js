const firebase = require('firebase');

const config = require('./config.json')

firebase.initializeApp(config);
const database = firebase.database();

const uploadPath = `img/bcn.jpg`;
const testUsername = 'test cyan';

function writeNewProfile(name, imageUrl) {
  firebase.database().ref('users/' + name).set({
    username: name,
    profile_picture : imageUrl
  });
}

function readProfile() {
  firebase.database().ref('/users/' + testUsername).once('value').then(function(snapshot) {
	const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
	const imageUrl = (snapshot.val() && snapshot.val().profile_picture) || 'Link';
	console.log(username, imageUrl);
  });
}

function test() {
	writeNewProfile(testUsername, uploadPath);
	readProfile();	
}
test();