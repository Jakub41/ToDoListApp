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