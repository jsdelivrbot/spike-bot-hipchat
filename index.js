var express = require('express');
var app = express();

app.get('/hello', function(request, response) {
  response.send("hello");
});

app.listen(80, function() {
  console.log('Node app is running on port', 80);
});


