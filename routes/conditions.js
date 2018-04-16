"use strict";

const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config/config');
const documentsConfig = config.get('documents');

const conditionConfig = config.get('conditionService');
const conditionClient = request.defaults({
    baseUrl: conditionConfig.url,
    timeout: conditionConfig.timeout
});
const archiveConfig = config.get('archiveService');
const archiveClient = request.defaults({
    baseUrl: archiveConfig.url,
    uri: archiveConfig.urlDocuments,
    timeout: archiveConfig.timeout
});

router.post('/:tourOperator', function (req, res, next) {
    const conditionOptions = {
        uri: 'conditions/' + req.params.tourOperator,
        qs: {type: req.query.type || documentsConfig.type}
    };
    conditionClient
        .get(conditionOptions, function (error, response, body) {
            if (error) {
                return next(new Error(error.message));
            }
        })
        .pipe(
            archiveClient.post({}, function (error, response, body) {
                if (error) {
                    return next(new Error(error.message));
                }
                try {
                    const filename = documentsConfig.url + '/' + JSON.parse(body).filename;
                    res.location(filename);
                    res.redirect(201, filename);
                } catch (err) {
                    next(err);
                }
            })
        );
});

module.exports = router;
