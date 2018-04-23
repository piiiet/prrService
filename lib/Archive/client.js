const request = require('request');

const config = require('../../config/config');
const documentsConfig = config.get('documents');
const archiveConfig = config.get('archiveService');

const archiveRequest = request.defaults({
    baseUrl: archiveConfig.url,
    uri: 'documents',
    timeout: archiveConfig.timeout
});

class Client {
    static post(callback) {
        return archiveRequest.post({}, function (error, response, body) {
            if (error) {
                callback(error);
            } else {
                try {
                    const filename = documentsConfig.url + '/' + JSON.parse(body).filename;
                    callback(null, filename);
                } catch (err) {
                    callback(err);
                }
            }
        });
    }
}

module.exports = Client;