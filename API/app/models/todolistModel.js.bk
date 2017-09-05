// Model Task Schema For MongoDB
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter the name of the task'
    },
    note: {
        type: String,
        //required: 'Please enter a note about your task'
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