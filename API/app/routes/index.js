'use strict';
let UserRoute = require('./userRoute');
let TaskRoute = require('./taskRoute');
let NoteRoute = require('./noteRoute');

let all = [].concat(UserRoute, TaskRoute, NoteRoute);
module.exports = all;