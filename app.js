'use strict';

const express = require('express');
const config = require('./config/config');
const conditions = require('./routes/conditions');


// application
const app = express();

// routes
app.use('/conditions', conditions);


app.listen(config.get('port'), function () {
    console.log(`archiveService running on port ${config.get('port')}`);
});
