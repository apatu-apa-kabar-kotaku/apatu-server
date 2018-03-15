var express = require('express');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

const mongoose = require('mongoose')
mongoose.connect('mongodb://agnynureza:12345@ds115219.mlab.com:15219/apatudb')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);

module.exports = app;