import TaskModel from '../models/task';

const TaskCollection = Backbone.Collection.extend({
  model: TaskModel,
  url: 'task',

  parse(data) {
    return data.taskArr.filter(item => item.isDeleted === false);
  }
});

export default TaskCollection;
