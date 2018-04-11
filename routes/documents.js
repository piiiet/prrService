"use strict";

const express = require('express');
const router = express.Router();
const request = require('request');
const archiveConfig = require('../config/config').get('archiveService');

const archiveClient = request.defaults({
    baseUrl: archiveConfig.url,
    timeout: archiveConfig.timeout
});

router.get('/:filename', function (req, res, next) {
    const archiveOptions = {
        uri: 'documents/' + req.params.filename
    };
    archiveClient.get(archiveOptions, function (error, response, body) {
        if (error) {
            return next(new Error(error.message));
        }
    }).pipe(res);
});
router.patch('/:filename', function (req, res, next) {
    const archiveOptions = {
        uri: 'documents/' + req.params.filename
    };
    archiveClient.patch(archiveOptions, function (error, response, body) {
        if (error) {
            return next(new Error(error.message));
        }
    }).pipe(res);
});
router.delete('/:filename', function (req, res, next) {
    const archiveOptions = {
        uri: 'documents/' + req.params.filename
    };
    archiveClient.delete(archiveOptions, function (error, response, body) {
        if (error) {
            return next(new Error(error.message));
        }
    }).pipe(res);
});

module.exports = router;
