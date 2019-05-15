"use strict";

const express = require('express');
const router = express.Router();
const request = require('request');

const config = require('../config/config');
const archiveConfig = config.get('archiveService');

const ArchiveClient = request.defaults({
    baseUrl: archiveConfig.url + '/documents',
    timeout: archiveConfig.timeout
});

router.post('', function (req, res, next) {
    ArchiveClient
        .post({
            uri: '',
            qs: {
                type: 'json'
            },
            body: req.body,
            json: true
        })
        .on('error', function (err) {
            return next(err);
        }).pipe(res);
});

module.exports = router;
