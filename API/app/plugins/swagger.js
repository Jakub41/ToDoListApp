// Swagger PlugIn
'use strict';

const HapiSwagger = require('hapi-swagger-next');
const Inert = require('inert');
const Vision = require('vision');

// Register Swagger
exports.register = (server, options, next) => {

    server.register([
        Inert,
        Vision,
        {
            'register': HapiSwagger,
            'options': {
                'info': {
                    'title': 'ToDo RESTFul API'
                },
                'pathPrefixSize': 2,
                'payloadType': 'json',
                'jsonEditor': true,
                'grouping': 'tags',
                'consumes': ['application/json', 'application/x-www-form-urlencoded'],
                'produces': ['application/json', 'application/x-www-form-urlencoded']
            }
        }
    ], (err) => {
        if (err) {
            Logger.winstonLogger.error(err);
        } else {
            console.log('hapi-swagger interface loaded')
        }
    });
    next();
};

exports.register.attributes = {
    name: 'swagger-plugin'
};