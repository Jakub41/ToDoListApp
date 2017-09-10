const TaskModel = Backbone.Model.extend({
  defaults: {
    name: '',
    description: '',
    dueOn: '',
  },

  urlRoot: 'task',

  validation: {
    name: {
      required: true,
    },
    description: {
      required: true,
    },
    dueOn: {
      required: true,
    }
  }
});

export default TaskModel;
