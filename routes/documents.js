"use strict";

const express = require('express');
const router = express.Router([]);

const ArchiveClient = require('../lib/ArchiveService/client');

router.get('/:filename', function (req, res, next) {
    ArchiveClient
        .get(req.params.filename)
        .on('error', function(err) {
            return next(err);
        })
        .pipe(res);
});

router.patch('/:filename', function (req, res, next) {
    ArchiveClient
        .patch(req.params.filename)
        .on('error', function(err) {
            return next(err);
        })
        .pipe(res);
});

router.delete('/:filename', function (req, res, next) {
    ArchiveClient
        .delete(req.params.filename)
        .on('error', function(err) {
            return next(err);
        })
        .pipe(res);
});

module.exports = router;
