const request = require('request');
const createError = require('http-errors');
const validator = require('is-my-json-valid/require');
const validate = validator('request.json');

const config = require('../../config/config');
const conditionConfig = config.get('conditionService');
const conditionRequest = request.defaults({
    baseUrl: conditionConfig.url,
    timeout: conditionConfig.timeout
});

class Client {
    static get(req) {
        this._validate(req);
        return conditionRequest.get({
            uri: 'conditions/' + req.body.tourOperatorCode,
            qs: req.body
        });
    }

    static _validate(req) {
        if (!validate(req.body)) {
            const error = validate.errors.shift();
            throw createError(400, error.field.replace('data.', '') + ' ' + error.message);
        }
    }
}

module.exports = Client;
