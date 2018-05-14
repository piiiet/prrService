"use strict";

const express = require('express');
const router = express.Router();

const FormClient = require('../lib/FormService/client');
const ArchiveClient = require('../lib/ArchiveService/client');

router.post('/:id', function (req, res, next) {
    FormClient
        .get(req, function (error, response, body) {
            if (error) {
                return next(new Error(error.message));
            }
            if (response.statusCode === 500) {
                return next(new Error(body));
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
