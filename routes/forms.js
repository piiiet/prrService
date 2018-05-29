"use strict";

const express = require('express');
const router = express.Router();

const FormClient = require('../lib/FormService/client');
const ArchiveClient = require('../lib/ArchiveService/client');

router.post('', function (req, res, next) {
    const r = FormClient
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
