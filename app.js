var express = require('express');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);

module.exports = app;