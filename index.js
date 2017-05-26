var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 8080));

var router = express.Router();

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'working!' });	
});

router.route('/:value')
	.put(function(req, res) {
		res.json({ message: 'echo:' + req.params.value });	
	});

app.use('/api', router);

app.listen(app.get('port'));