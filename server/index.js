const path = require('path');
const logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/env');
const PORT = config.port;

const app = express();

// Serve frontend files
app.use(express.static(path.join(__dirname, '../client')));
app.use('/bower_components', express.static(path.dirname(__dirname) + '/bower_components'));

app.use(logger('dev'));

// Handle POST request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiRoutes = require('./routes/index.js');
app.use('/api', apiRoutes);

mongoose.connect(config.database);

app.listen(PORT, () => {
    console.log(`Magic on localhost:${PORT}`);
});
