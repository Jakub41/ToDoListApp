import Template from '../../templates/home/task.html';
import Api from '../../api';
import NotesListView from './notesListView';
import NotesCollection from '../../collections/notes';
import NoteModel from '../../models/note';
import moment from 'moment';

const TaskView = Mn.View.extend({
    template: _.template(Template),
    tagName: 'li',
    className: 'slide-in-fwd-center task-item',

    // set regions to show view there
    regions: {
        notesRegion: '.notes',
    },

    // data bindings
    bindings: {
        ':el': {
            classes: {
                'done': {
                    observe: 'isCompleted',
                }
            },
            observe: 'isDeleted',
            visible: (value) => !value,
        },
        '.title .text': 'name',
        '.description': 'description',
        '.due-date': {
            observe: 'dueOn',
            onGet(date) {
                return 'Due: ' + moment(new Date(date)).format("MMM Do YY");
            }
        },
        '.edit-task-form #name': 'name',
        '.edit-task-form #description': 'description',
        '.edit-task-form #dueOn': {
            observe: 'dueOn',
            onGet(date) {
                return moment(new Date(date)).format("MM/DD/YYYY");
            }
        },
    },

    noteBindings: {
        '#note': 'note',
    },

    // view bindings
    viewBindings: {
        '.add-note-form': {
            observe: 'addNoteIsVisible',
            visible: true,
        },
        '.edit': {
            observe: 'editTaskIsVisible',
            visible: (val) => val,
        },
        '.info': {
            observe: 'editTaskIsVisible',
            visible: (val) => !val,
        },
    },

    // events binding
    events: {
        'click .remove': 'removeTodo',
        'click .check': 'toggleIsDone',
        'submit .add-note-form': 'addNote',
        'submit .edit-task-form': 'editTask',
        'click .notes-title': 'toggleAddNote',
        'click .edit-task': 'toggleEditTask',
        'click .edit-task-form .cancel': 'closeEditTask',
    },

    initialize() {
        // init notes collection
        this.notesCollection = new NotesCollection([], {
            taskId: this.model.get('_id'),
        });

        // init notes list view and pass notes collection there
        this.notesListView = new NotesListView({
            collection: this.notesCollection,
        });

        // init note model and pass taskId into
        this.noteModel = new NoteModel({
            taskId: this.model.get('_id')
        });

        // init view managing model for bindings
        this.viewModel = new Backbone.Model({
            addNoteIsVisible: false,
            editTaskIsVisible: false,
        });

        // fetch notes list. render will be called automatically
        this.notesCollection.fetch();

        this.taskCache = this.model.toJSON();
    },

    removeTodo() {
        this.$el.addClass('slide-out-bck-center');

        _.delay(() => {
            Api.put('task', {
                taskId: this.model.get('_id'),
                isDeleted: true
            }).then(res => {
                if (res.flag === 202) {
                    this.model.destroy();
                } else {
                    new Noty({ text: res.message, type: 'error' }).show();
                }
            }, e => new Noty({ text: e.responseJSON.message, type: 'error' }).show());
        }, 500);
    },

    toggleIsDone() {
        this.$el.addClass('pulsate-fwd');

        Api.put('task', {
            taskId: this.model.get('_id'),
            isCompleted: !this.model.get('isCompleted')
        }).then(res => {
            if (res.flag === 202) {
                this.model.set('isCompleted', !this.model.get('isCompleted'));
            } else {
                new Noty({ text: res.message, type: 'error' }).show();
            }
        }, e => new Noty({ text: e.responseJSON.message, type: 'error' }).show());

        _.delay(() => {
            this.$el.removeClass('pulsate-fwd');
        }, 400);
    },

    // submit add note form
    addNote(e) {
        e.preventDefault();
        Api.post('note', {
            taskId: this.model.get('_id'),
            note: this.noteModel.get('note'),
        }).then(res => {
            if (res.flag === 201) {
                this.notesCollection.add(res.noteId);

                this.noteModel.clear().set(this.noteModel.defaults);
                this.noteModel.set({
                    taskId: this.model.get('_id'),
                });
                this.viewModel.set('addNoteIsVisible', false);
            } else {
                new Noty({ text: res.message, type: 'error' }).show();
            }
        }, e => new Noty({ text: e.responseJSON.message, type: 'error' }).show());
    },

    // submit edit task form
    editTask(e) {
        e.preventDefault();

        // make server request
        Api.put('task', {
            taskId: this.model.get('_id'),
            name: this.model.get('name'),
            description: this.model.get('description'),
            dueOn: this.model.get('dueOn'),
        }).then(res => {
            if (res.flag === 202) {
                new Noty({ text: res.description, type: 'success' }).show();
                this.taskCache = this.model.toJSON();
                this.closeEditTask();
            } else {
                new Noty({ text: res.message, type: 'error' }).show();
            }
        }, e => new Noty({ text: e.responseJSON.message, type: 'error' }).show());
    },

    toggleAddNote() {
        // toggles add note form
        this.viewModel.set('addNoteIsVisible', !this.viewModel.get('addNoteIsVisible'));
    },

    toggleEditTask() {
        // toggles edit task form
        this.viewModel.set('editTaskIsVisible', !this.viewModel.get('editTaskIsVisible'));
    },

    closeEditTask() {
        // reset model to prev values
        this.model.set(this.taskCache);
        // close form
        this.viewModel.set('editTaskIsVisible', false);
    },

    onRender() {
        // init data bindings
        this.stickit();
        this.stickit(this.noteModel, this.noteBindings);
        this.stickit(this.viewModel, this.viewBindings);

        // show notes list view
        this.showChildView('notesRegion', this.notesListView);

        // set datapicker
        this.$('.edit-task-form #dueOn').datepicker({
            startDate: new Date(),
        });

        _.delay(() => {
            this.$el.removeClass('slide-in-fwd-center');
        }, 500);
    }
});

export default TaskView;