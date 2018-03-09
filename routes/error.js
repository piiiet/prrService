'use strict';

exports.error404 = function(req, res, next) {
    const err = new Error('not found');
    err.code = 404;
    next(err);
};

exports.errorHandler = function(err, req, res, next) {
    let response = {
        error: err.message,
    };
    res.status(err.code || 500).json(response);
};
