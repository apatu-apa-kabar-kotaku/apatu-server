var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');
const cors            = require('cors')
var app = express();
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect('mongodb://reynaldi:12345@ds163417.mlab.com:63417/apatudb')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use('/', index);

module.exports = app;