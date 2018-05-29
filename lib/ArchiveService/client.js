const request = require('request');

const config = require('../../config/config');
const documentsConfig = config.get('documents');
const archiveConfig = config.get('archiveService');

const archiveRequest = request.defaults({
    baseUrl: archiveConfig.url + '/documents',
    timeout: archiveConfig.timeout
});

class Client {
    static post(callback) {
        return archiveRequest.post({
            uri: ''
        }, callback);
    }

    static get(filename, callback) {
        return archiveRequest.get({
            uri: filename
        }, callback);
    }

    static patch(filename, callback) {
        return archiveRequest.patch({
            uri: filename
        }, callback);
    }

    static delete(filename, callback) {
        return archiveRequest.delete({
            uri: filename
        }, callback);
    }
}

module.exports = Client;
