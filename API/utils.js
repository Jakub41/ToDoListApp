// Helper File
'use strict';

const config = require('config');

// Logs
const Logger = require('./app/lib/logger');

// Status Config
const statusCodes = require('./app/config/statusCodes');

module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
    failActionFunction
}

/**
 * Compresses a given response object and sends it.
 * @param  {object} response    Contains the final result of any API
 * @param  {stream} res         express res stream
 */
function sendSuccessResponse(response, res) {
    if (!response.flag)
        response.flag = statusCodes.OK;

    if (!response.message)
        response.message = statusCodes.getStatusText(statusCodes.OK);

    return res(response);
}

/**
 * Sends a response in case of an error
 * @param  {object} error       {responseFlag, responseMessage}
 * @param  {stream} res         express res stream
 */
function sendErrorResponse(error, res) {
    if (!response.flag)
        response.flag = statusCodes.METHOD_FAILURE;

    if (!response.message)
        response.message || statusCodes.getStatusText(statusCodes.METHOD_FAILURE);

    let response = {
        flag: error.responseFlag,
        message: error.responseMessage
    };

    if (error.addInfo)
        for (let key in error.addInfo) {
            response[key] = error.addInfo[key];
        }

    Logger.winstonLogger.error(error);
    res(response);
}

function failActionFunction(request, reply, source, error) {
    let customErrorMessage = '';

    if (error.output.playload.message.indexOf('[') > -1)
        customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));

    customErrorMessage = error.output.playload.message;

    customErrorMessage = customErrorMessage.replace(/"/g, '');
    customErrorMessage = customErrorMessage.replace('[', '');
    customErrorMessage = customErrorMessage.replace(']', '');
    error.output.payload.message = customErrorMessage;
    delete error.output.payload.validation;
    return reply(error);
};