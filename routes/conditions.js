"use strict";

const express = require('express');
const router = express.Router();

const ConditionClient = require('../lib/ConditionService/client');
const ArchiveClient = require('../lib/ArchiveService/client');

router.post('', function (req, res, next) {
    const r = ConditionClient
        .get(req)
        .on ('error', function(err) {
            return next(err);
        })
        .on('response', function (response) {
            if (response.statusCode === 200) {
                r.pipe(
                    ArchiveClient.post(function (error, filename) {
                        if (error) {
                            return next(new Error(error.message));
                        }
                        res.location(filename);
                        res.redirect(201, filename);
                    })
                );
            } else {
                r.pipe(res);
            }
        });
});

module.exports = router;
