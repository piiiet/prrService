"use strict";

const express = require('express');
const router = express.Router();

const RequirementsClient = require('../lib/RequirementsService/client');
const ArchiveClient = require('../lib/ArchiveService/client');

router.post('/countries/:country', handleRequest);
router.post('/airports/:airport', handleRequest);

function handleRequest(req, res, next) {
    const r = RequirementsClient
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
}

module.exports = router;
