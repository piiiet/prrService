"use strict";

const express = require('express');
const router = express.Router();

const ArchiveClient = require('../lib/ArchiveService/client');
const pdfClient = require('../lib/PdfService/client');

router.post('', function (req, res, next) {
    pdfClient
        .post('')
        .on('error', function (err) {
            return next(err);
        })
        .form({
            html: req.query.text
        })
        .pipe(ArchiveClient
            .post()
            .on('error', function (err) {
                return next(err);
            })
        ).pipe(res);
});

module.exports = router;
