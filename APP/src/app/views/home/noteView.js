import Template from '../../templates/home/noteView.html';
import Api from '../../api';

// notes list view
const NoteView = Mn.View.extend({
    tagName: 'li',
    className: 'note-item',
    template: _.template(Template),

    // data bindings
    bindings: {
        ':el': {
            classes: {
                'done': {
                    observe: 'isCompleted',
                }
            },
        },
        '.note': 'note',
        '.edit-note-form #note': 'note',
    },

    // view behaviour bindings
    viewBindings: {
        '.edit': {
            observe: 'editNoteIsVisible',
            visible: (val) => val,
        },
        '.info': {
            observe: 'editNoteIsVisible',
            visible: (val) => !val,
        },
    },


    // events bidings
    events: {
        'click .edit-note': 'toggleEditNote',
        'click .edit-note-form .cancel': 'closeEditTask',
        'click .remove-note': 'removeNote',
        'click .complete-note': 'toggleCompleteNote',
        'submit .edit-note-form': 'editNote',
    },

    initialize() {
        // init view managing model for bindings
        this.viewModel = new Backbone.Model({
            editNoteIsVisible: false,
        });

        // save note cache for edit undo
        this.noteCache = this.model.toJSON();
    },

    toggleEditNote() {
        this.viewModel.set('editNoteIsVisible', !this.viewModel.get('editNoteIsVisible'));
    },

    closeEditTask() {
        this.model.set(this.noteCache);
        this.viewModel.set('editNoteIsVisible', false);
    },

    // remove note. save as task
    removeNote() {
        Api.put('note', {
            taskId: this.model.get('taskId'),
            noteId: this.model.get('_id'),
            isDeleted: true
        }).then(res => {
            if (res.flag === 202) {
                this.model.destroy();
            } else {
                new Noty({ text: res.message, type: 'error' }).show();
            }
        }, e => new Noty({ text: e.responseJSON.message, type: 'error' }).show());
    },

    // toggle note complete// save as task
    toggleCompleteNote() {
        Api.put('note', {
            taskId: this.model.get('taskId'),
            noteId: this.model.get('_id'),
            isCompleted: !this.model.get('isCompleted')
        }).then(res => {
            if (res.flag === 202) {
                this.model.set('isCompleted', !this.model.get('isCompleted'));
            } else {
                new Noty({ text: res.message, type: 'error' }).show();
            }
        }, e => new Noty({ text: e.responseJSON.message, type: 'error' }).show());
    },

    // note edit submit function same as task submit
    editNote(e) {
        e.preventDefault();

        Api.put('note', {
            taskId: this.model.get('taskId'),
            noteId: this.model.get('_id'),
            note: this.model.get('note'),
        }).then(res => {
            if (res.flag === 202) {
                new Noty({ text: res.description, type: 'success' }).show();
                this.noteCache = this.model.toJSON();
                this.closeEditTask();
            } else {
                new Noty({ text: res.message, type: 'error' }).show();
            }
        }, e => new Noty({ text: e.responseJSON.message, type: 'error' }).show());
    },

    onRender() {
        this.stickit();
        this.stickit(this.viewModel, this.viewBindings);
    }
});

export default NoteView;