const NoteModel = Backbone.Model.extend({
  defaults: {
    taskId: '',
    note: '',
  },

  urlRoot: 'note',

  validation: {
    note: {
      required: true,
    },
  }
});

export default NoteModel;