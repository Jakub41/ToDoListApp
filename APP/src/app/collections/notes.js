import NoteModel from '../models/note';

const NotesCollection = Backbone.Collection.extend({
  model: NoteModel,
  url() {
    return `note?taskId=${this.taskId}`;
  },

  initialize(models, options) {
    this.taskId = options.taskId;
  },

  parse(data) {
    return data.noteArr.filter(item => item.isDeleted === false);
  }
});

export default NotesCollection;
