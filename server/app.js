const path = require('path');
const logger = require('morgan');
const express = require('express');
const passport = require('passport');
// const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('./api/models/db.js');
require('./config/passport.config.js')(passport);


const app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use('/bower_components', express.static( path.dirname(__dirname) + '/bower_components'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(passport.initialize());

const apiRoutes = require('./api/routes/index.js');
app.use('/', apiRoutes);


app.use( (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

/*
 * Unauthorozed Errors
 */
app.use( (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            message: `${err.name} : ${err.message}`
        });
    }
});

/* development error handler
 * will print stacktrace
 */
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/* production error handler
 * no stacktraces leaked to user
 */
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;