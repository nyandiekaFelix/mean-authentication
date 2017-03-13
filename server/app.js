const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').load();

const app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use('/bower_components', express.static( path.dirname(__dirname) + '/bower_components'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const apiRoutes = require('./api/routes/index.js');
app.use('/api', apiRoutes);



module.exports = app;