"use strict";

const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config/config');
const documents = config.get('documents');
const conditionConfig = config.get('conditionService');
const archiveConfig = config.get('archiveService');

const conditionClient = request.defaults({
    baseUrl: conditionConfig.url,
    timeout: conditionConfig.timeout
});
const archiveClient = request.defaults({
    baseUrl: archiveConfig.url,
    timeout: archiveConfig.timeout
});

router.post('/:tourOperator', function (req, res, next) {
    const conditionOptions = {
        uri: 'conditions/' + req.params.tourOperator,
        qs: {type: req.params.type || documents.type}
    };
    const archiveOptions = {
        uri: 'documents'
    };
    conditionClient
        .get(conditionOptions, function (error, response, body) {
            if (error) {
                return next(new Error(error.message));
            }
        })
        .pipe(
            archiveClient.post(archiveOptions, function (error, response, body) {
                if (error) {
                    return next(new Error(error.message));
                }
                try {
                    const filename = documents.url + '/' + JSON.parse(body).filename;
                    res.location(filename);
                    res.redirect(201, filename);
                } catch (err) {
                    next(err);
                }
            })
        );
});

module.exports = router;
