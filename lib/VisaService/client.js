const request = require('request');
const createError = require('http-errors');
const validator = require('is-my-json-valid/require');
const validate = validator('request.json');

const config = require('../../config/config');
const visaConfig = config.get('visaService');
const visaRequest = request.defaults({
/*
    baseUrl: visaConfig.url,
*/
    timeout: visaConfig.timeout
});

class Client {
    static get(req) {
        this._validate(req);
        return visaRequest.get({
            url: 'https://testapi.passolution.de/condition/search.php?aid=2018-01-23-02-traffics@passolution.de&apw=gfHEDtz67Uk!ew&sid=2018-01-23-02-traffics@passolution.de&sidpw=gfHEDtz67Uk!ew&ino=1&descd=1&trv=1&vis=1&lang=de&nat=de&destco=ES'
/*
            uri: req.url,
            qs: req.body
*/
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
