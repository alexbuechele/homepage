var express = require('express');
var path = require('path');
//read favicon docs
var favicon = require('serve-favicon');
//read logger docs
var logger = require('morgan');
//read cookie-parser docs
var cookieParser = require('cookie-parser');
//read body-parser docs
var bodyParser = require('body-parser');

var app = express();

//view engine setup, using pug. formerly known as jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment when i have placed favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./routes'));

//mind the order
app.use(express.static(path.join(__dirname, 'public')));



// error handling? 404?

module.exports = app;