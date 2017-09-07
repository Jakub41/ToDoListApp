import TaskModel from '../models/taskModel';

const TaskCollection = Backbone.Collection.extend({
    model: TaskModel,
    url: 'task',

    parse(data) {
        return data.taskArr;
    }
});

export default TaskCollection;