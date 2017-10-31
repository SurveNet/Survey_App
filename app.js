'use strict'

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
var path = require('path')


//Check if access tokens are present
if (!config.TENSORPORT_TOKEN) {
	throw new Error('You are missing a tensorport access token');
}


app.set('port', (process.env.PORT || 5000))

//serve static files in the public directory
app.use(express.static('public'));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))

//Process application/json
app.use(bodyParser.json())
 
// Index route -- HTML WILL GO HERE
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/public/html/index.html'));
})


//*************************************** */
var server = app.listen(app.get('port'), function () {
    var host = server.address().address
	console.log('Application running at http://%s:%s', host, ' on port', app.get('port'))
})
