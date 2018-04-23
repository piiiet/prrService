"use strict";

const express = require('express');
const router = express.Router();

const ConditionClient = require('../lib/ConditionService/client');
const ArchiveClient = require('../lib/ArchiveService/client');

router.post('/:tourOperator', function (req, res, next) {
    ConditionClient
        .get(req, function (error, response, body) {
            if (error) {
                return next(new Error(error.message));
            }
        })
        .pipe(
            ArchiveClient.post(function (error, filename) {
                if (error) {
                    return next(new Error(error.message));
                }
                res.location(filename);
                res.redirect(201, filename);
            })
        );
});

module.exports = router;
