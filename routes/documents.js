"use strict";

const express = require('express');
const router = express.Router();

const ArchiveClient = require('../lib/ArchiveService/client');

router.get('/:filename', function (req, res, next) {
    ArchiveClient.get(req.params.filename, (error, response, body) => {
        if (error) {
            return next(error);
        }
    }).pipe(res);
});

router.patch('/:filename', function (req, res, next) {
    ArchiveClient.patch(req.params.filename, (error, response, body) => {
        if (error) {
            return next(error);
        }
    }).pipe(res);
});

router.delete('/:filename', function (req, res, next) {
    ArchiveClient.delete(req.params.filename, (error, response, body) => {
        if (error) {
            return next(error);
        }
    }).pipe(res);
});

module.exports = router;
