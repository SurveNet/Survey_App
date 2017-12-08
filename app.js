'use strict'
const config = require('./config');
const express = require('express');  
const bodyParser = require('body-parser');
const request = require('request');
var cloudinary = require('cloudinary');
var path = require('path')
const app = express();

//Check if access tokens are present
if (!config.TENSORPORT_TOKEN) {
	throw new Error('You are missing an access token');
}

//Set port to 5000 or an evironmentally allocated port
app.set('port', (process.env.PORT || 5000))

//serve static files in the public directory
app.use(express.static('public'));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))

//Process application/json
app.use(bodyParser.json())
 

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
	next();
  });



// Index route -- HTML WILL GO HERE
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/public/html/index.html'));

})

/*******************************/
var server = app.listen(app.get('port'), function () {
    var host = server.address().address
	console.log('Application running on port', app.get('port'))
})



