'use strict';

const uuidv1 = require('uuid/v1');
// For hash passwords - security
const bcrypt = require('bcrypt');
const utils = require('../../utils');

const Task = require('../models/taskModel');
const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Logger = require('../lib/logger');
const Constants = require('../config/constants');
const statusCodes = require('../config/statusCodes');

exports.postTask = postTask;
exports.getTask = getTask;
exports.putTask = putTask;

/**
 * Create a new task
 * @param  {function} request
 * @param  {function} reply
 */
function postTask(request, reply) {
    return new Promise((resolve, reject) => {
        let access_token = request.headers.authorization;
        let taskInfo = request.payload;

        runner()
            .then(response => {
                return resolve(response);
            })
            .catch(error => {
                return reject(error);
            });

        async function runner() {
            // Check task completion date/time
            let currentDate = new Date();
            if (taskInfo.dueOn < currentDate) {
                let response = {
                    flag: statusCodes.NOT_ACCEPTABLE,
                    message: statusCodes.getStatusText(statusCodes.NOT_ACCEPTABLE),
                    description: 'Err! Due date/time is already gone'
                };
                return response;
            }
            let userFilters = {
                access_token: access_token
            };
            let userArr = await User.find(userFilters);
            if (userArr.length === 0) {
                let response = {
                    flag: statusCodes.UNAUTHORIZED,
                    message: statusCodes.getStatusText(statusCodes.UNAUTHORIZED),
                    description: 'Invalid token'
                };
                return response;
            }
            let user = userArr[0];
            taskInfo.userId = user._id;
            let taskId = await Task(taskInfo).save();
            let response = {
                flag: statusCodes.CREATED,
                message: statusCodes.getStatusText(statusCodes.CREATED),
                taskId: taskId
            };
            return response;
        }
    });
}