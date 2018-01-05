var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('Hi, World!\n);
	console.log('Hi, Console!\n');
});

var port = 9000;

app.listen(port);

console.log('Listening on port ', port);
