'use strict';

const express = require('express');
const createError = require('http-errors');
const config = require('./config/config');
const alive = require('./routes/alive');
const requirements = require('./routes/requirements');
const conditions = require('./routes/conditions');
const forms = require('./routes/forms');
const documents = require('./routes/documents');

// logger
global.logger = console;

// application
const app = express();


// routes
app.use('/alive', alive);
app.use('/requirements', requirements);
app.use('/conditions', conditions);
app.use('/forms', forms);
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
    console.log(`documentService running on port ${config.get('port')}`);
});

