var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.set('port', (process.env.PORT || 8080));

var router = express.Router();

router.use(function(req, res, next) {
	console.log('Request:');
	next();
});

router.route('/hipchat/post/:host/:room/:authtoken')
	.put(function(req, res) {
		var host = req.params.host;
		var room = req.params.room;
		var authtoken = req.params.authtoken;
		var hipchatNotificationUrl =
		"https://" + host + 
		".hipchat.com/v2/room/" + room +
		"/notification?auth_token=" + authtoken;

		var httpBody = '{"message_format": "text", "message":"What\'s that spike?" }'

		request(
			{
				method: 'POST',
				uri: hipchatNotificationUrl,
				headers: { "Content-Type": "application/json" },
				body: httpBody
			},
			function (error, response, body) {
			    console.log('response: '+ response.statusCode)
			    console.log(body)
			}
		)

		res.json({ message: 'success' });
	});

app.use('/api', router);

app.listen(app.get('port'), function() {
	console.log('Running on port:' + app.get('port'));
});


