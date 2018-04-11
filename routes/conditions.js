"use strict";

const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config/config');
const documentType = config.get('documentType');
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
        qs: {type: req.params.type || documentType}
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
                const location = req.baseUrl + '/' + JSON.parse(body).token;
                res.location(location);
                res.redirect(201, location);
            })
        );
});

module.exports = router;
