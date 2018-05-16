const request = require('request');
const createError = require('http-errors');
const validator = require('is-my-json-valid/require');
const validate = validator('request.json');

const config = require('../../config/config');
const formConfig = config.get('formService');
const formRequest = request.defaults({
    baseUrl: formConfig.url,
    timeout: formConfig.timeout
});

class Client {
    static get(req) {
        this._validate(req);
        return formRequest.get({
            uri: 'forms/' + req.params.id,
            qs: {
                tourOperatorCode: req.query.tourOperatorCode,
                type: req.query.type
            }
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
