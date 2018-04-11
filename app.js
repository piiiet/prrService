'use strict';

const express = require('express');
const config = require('./config/config');
const conditions = require('./routes/conditions');
const documents = require('./routes/documents');
const error = require('./routes/error');


// application
const app = express();

// routes
app.use('/conditions', conditions);
app.use('/documents', documents);
app.use(error.error404, error.errorHandler);


app.listen(config.get('port'), function () {
    console.log(`documentService running on port ${config.get('port')}`);
});
