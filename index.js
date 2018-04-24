'use strict'
const express = require('express');  
const bodyParser = require('body-parser');
var path = require('path')
const app = express();

//Set port to 5000 or an evironmentally allocated port
app.set('port', (process.env.PORT || 3030))

//serve static files in the public directory
app.use(express.static('public'));
app.use(express.static('node_modules'));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//Process application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/index.html'));
});

var server = app.listen(app.get('port'), function () {
    var host = server.address().address
	console.log('Application running on port', app.get('port'))
})