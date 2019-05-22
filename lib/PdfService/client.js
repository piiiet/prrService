const request = require('request');

const config = require('../../config/config');
const pdfConfig = config.get('pdfService');

const pdfRequest = request.defaults({
    baseUrl: pdfConfig.url,
    timeout: pdfConfig.timeout
});

class Client {
    static post(callback) {
        return pdfRequest.post({
            uri: ''
        }, callback);
    }
}

module.exports = Client;
