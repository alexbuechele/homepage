var express = require('express');
var app = express();


app.use(function (req, res, next){
	//req.headers["x-real-ip"] gives their ip address
	next();
});

//app.use(require(myrouter??))

app.use(express.static("./public"));

module.exports = app;