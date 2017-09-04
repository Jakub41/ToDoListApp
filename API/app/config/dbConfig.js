// DB Config MongoDB
'use strict';

const mongoose = require('mongoose');
const config = require('config');

const Logger = require('../lib/logger');
mongoose.Promise = Promise;
global.Mongoose = mongoose;

let uri = config.get('mongoDb.URI');

//Connect to MongoDB
exports.connection = mongoose.connect(
        uri, {
            useMongoClient: true
        }
    )
    .then(success => {
        mongoose.set('debug', true);
        console.log('MongoDB Connected');
    })
    .catch(err => {
        Logger.winstonLogger.error({
            ERROR: err
        });
        process.exit(1);
    });