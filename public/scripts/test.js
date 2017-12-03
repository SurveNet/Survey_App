const request = require('request');
const config = require('./config');


$('#button').click(function(){
    console.log('button clicked');

    options = {
		url: config.PREDICTION_API,
		method: 'POST'
	}

	request(options, function(error, res, body){
			if(error){
				console.log('error occured')
			}
			else{

			}
			console.log('From app.js', body.result);
	})
});


