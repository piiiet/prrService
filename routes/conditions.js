"use strict";

const express = require('express');
const router = express.Router();
const request = require('request');
const conditionConfig = require('../config/config').get('conditionService');
const archiveConfig = require('../config/config').get('archiveService');

const conditionClient = request.defaults({
    baseUrl: conditionConfig.url + '/conditions',
    timeout: conditionConfig.timeout
});

const archiveClient = request.defaults({
    baseUrl: archiveConfig.url,
    timeout: archiveConfig.timeout
});

router.get('/:tourOperator', function (req, res, next) {
    const conditionOptions = {
        uri: req.params.tourOperator,
        qs: {type: 'pdf'}
    };
    const archiveOptions = {
        uri: 'conditions'
    };
    conditionClient
        .get(conditionOptions)
        .on('error', function (err) {
            throw err;
        })
        .pipe(archiveClient.post(archiveOptions, function (err, response, body) {
            if (err) {
                throw err;
            }
            res.json({url: `http://documentService/conditions/${JSON.parse(body).token}`});
        }));
});

module.exports = router;
