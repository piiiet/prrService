"use strict";

const express = require('express');
const router = express.Router();
const request = require('request');
const validator = require('is-my-json-valid');
const config = require('../config/config');
const documentsConfig = config.get('documents');

const formConfig = config.get('formService');
const formClient = request.defaults({
    baseUrl: formConfig.url,
    timeout: formConfig.timeout
});
const archiveConfig = config.get('archiveService');
const archiveClient = request.defaults({
    baseUrl: archiveConfig.url,
    uri: archiveConfig.urlDocuments,
    timeout: archiveConfig.timeout
});

const validate = validator({
    required: true,
    type: 'object',
    properties: {
        tourOperatorCode: {
            required: true,
            type: 'string'
        },
        type: {
            type: 'string',
            enum:
            - 'pdf'
            - 'html',
            default: 'pdf'
        }
    }
});

router.post('/:type', function (req, res, next) {
    // validate request
    if (!validate(req.query)) {
        const error = validate.errors.shift();
        throw createError(400, error);
    }

    const formOptions = {
        uri: 'forms/' + req.params.type,
        qs: {tourOperatorCode: req.query.tourOperatorCode}
    };
    formClient
        .get(formOptions, function (error, response, body) {
            if (error) {
                return next(new Error(error.message));
            }
        })
        .pipe(
            archiveClient.post({}, function (error, response, body) {
                if (error) {
                    return next(new Error(error.message));
                }
                try {
                    const filename = documentsConfig.url + '/' + JSON.parse(body).filename;
                    res.location(filename);
                    res.redirect(201, filename);
                } catch (err) {
                    next(err);
                }
            })
        );
});

module.exports = router;
