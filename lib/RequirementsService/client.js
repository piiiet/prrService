const request = require('request');
const createError = require('http-errors');
const validator = require('is-my-json-valid/require');
const validate = validator('request.json');

const config = require('../../config/config');
const requirementsConfig = config.get('entryRequirementsService');
const requirementsRequest = request.defaults({
    baseUrl: requirementsConfig.url,
    timeout: requirementsConfig.timeout
});

class Client {
    static get(req) {
        this._validate(req);
        return requirementsRequest.get({
            uri: req.originalUrl.replace(req.baseUrl, ''),
            qs: req.query
        });
    }

    static _validate(req) {
        if (!validate(req.query)) {
            const error = validate.errors.shift();
            throw createError(400, error.field.replace('data.', '') + ' ' + error.message);
        }
    }
}

module.exports = Client;
