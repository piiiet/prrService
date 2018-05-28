const nconf   = require('nconf');

// load sources, order matters, first come - first serve
nconf.env()
    .argv()
    .file('node_env',   {file: process.env.NODE_ENV + '.json',  dir: __dirname, search: true})
    .file('default',    {file: 'default.json',                  dir: __dirname, search: true})
;

// check required keys
nconf.required([
    'NODE_ENV',
    'port'
]);

module.exports = nconf;
