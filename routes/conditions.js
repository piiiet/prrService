"use strict";

const express = require('express');
const router = express.Router();

const ConditionClient = require('../lib/ConditionService/client');
const ArchiveClient = require('../lib/ArchiveService/client');

router.post('', function (req, res, next) {
    const r = ConditionClient
        .get(req)
        .on('error', function (err) {
            return next(err);
        })
        .on('response', function (response) {
            if (response.statusCode === 200 && response.headers['content-disposition']) { // mediaserver returns 200 even empty response
                r.pipe(ArchiveClient.post()).pipe(res);
            } else {
                res.sendStatus(400);
            }
        });
});

module.exports = router;

