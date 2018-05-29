'use strict';

const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const config = require('./config/config');
const alive = require('./routes/alive');
const visa = require('./routes/visa');
const conditions = require('./routes/conditions');
const forms = require('./routes/forms');
const documents = require('./routes/documents');

// logger
global.logger = console;

// application
const app = express();

// post data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
app.use('/alive', alive);
app.use('/conditions', conditions);
app.use('/forms', forms);
app.use('/visa', visa);
app.use('/documents', documents);

// error handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    logger.error(err.message, err);
    res.status(err.status || 500).send(err.message);
});


app.listen(config.get('port'), function () {
    console.log(`prrService running on port ${config.get('port')}`);
});

