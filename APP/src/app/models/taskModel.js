const TaskModel = Backbone.Model.extend({

    defaults: {
        name: '',
        description: '',
        dueOn: new Date().valueOf() + 60 * 60 * 60 * 24,
    },

    urlRoot: 'task',

    validation: {
        name: {
            required: true,
        },
        description: {
            required: true,
        }
    }
});

export default TaskModel;