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
        nat: {
            required: true,
            type: 'string',
            minLength: 2,
            maxLength: 2,
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

router.post('/countries/:country', function(req, res, next){
    getByCountry(req, res, next);
});

router.post('/airports/:airport', function(req, res, next){
    getByAirport(req, res, next);
});


module.exports = router;
