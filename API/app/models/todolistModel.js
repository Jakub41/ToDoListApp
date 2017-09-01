// Model Schema For MongoDB
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter the name of the task'
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);