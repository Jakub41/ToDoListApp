// User Controller
'use strict';

const uuidv1 = require('uuid/v1');
// For hash passwords - security
const bcrypt = require('bcrypt');
const utils = require('../../utils');
const User = require('../models/userModel');
const Logger = require('../lib/logger');
const Constants = require('../config/constants');
const statusCodes = require('../config/statusCodes');

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUser = getUser;
exports.logoutUser = logoutUser;

function registerUser(request, reply) {
    return new Promise((resolve, reject) => {
        let userInfo = request.playload;
        userInfo.access_token = uuidv1();
        if (userInfo.password)
            userInfo.password = bcrypt.hashSync(
                userInfo.password,
                Constants.saltRounds
            );

        User(userInfo).save()
            .then(success => {
                let response = {
                    flag: statusCodes.CREATED,
                    message: statusCodes.getStatusText(statusCodes.CREATED),
                    access_token: success.access_token
                }
                return resolve(response);
            })
            .catch(error => {
                return reject(error);
            });
    });
}