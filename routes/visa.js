"use strict";

const express = require('express');
const router = express.Router();

const VisaClient = require('../lib/VisaService/client');
const ArchiveClient = require('../lib/ArchiveService/client');

router.post('', function (req, res, next) {
    req.url = req.body.country ? 'countries/' + req.body.country : (req.body.airport ? 'airports/' + req.body.airport : '');
    const r = VisaClient
        .get(req)
        .on ('error', function(err) {
            return next(err);
        })
        .on('response', function (response) {
            if (response.statusCode === 200) {
                r.pipe(
                    ArchiveClient
                        .post()
                        .on ('error', function(err) {
                            return next(err);
                        })
                        .on('response', function (response) {
                            res.redirect(response.statusCode, response.headers.location);
                        })
                );
            } else {
                r.pipe(res);
            }
        });
});

module.exports = router;
