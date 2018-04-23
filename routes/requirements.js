"use strict";

const express = require('express');
const router = express.Router();

const RequirementsClient = require('../lib/RequirementsService/client');
const ArchiveClient = require('../lib/ArchiveService/client');

router.post('/countries/:country', function (req, res, next) {
    RequirementsClient
        .getByCountry(req, function (error, response, body) {
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

router.post('/airports/:airport', function (req, res, next) {
    RequirementsClient
        .getByAirport(req, function (error, response, body) {
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
