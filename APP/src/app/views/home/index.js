import Template from '../../templates/home/index.html';
import TaskCollection from '../../collections/tasks';
import TaskModel from '../../models/task';
import TaskCollectionView from './listView';
import Api from '../../api';
import App from '../../main';
import datepicker from '@fengyuanchen/datepicker';

// Homepage view
const HomeView = Mn.View.extend({
    className: 'home-page',
    collection: new TaskCollection(),
    model: new TaskModel(),

    // specify view region to render blocks there later
    regions: {
        'toDoListRegion': '.to-do-list'
    },

    template: _.template(Template),

    // bind events
    events: {
        'submit .add-task-form': 'addToDo',
        'click .open-new-to-do': 'showAddTodoForm',
        'click .close-new-to-do': 'closeAddTodoForm',
        'click .logout': 'logout',
    },

    // set data bindings
    bindings: {
        '.add-task-form #name': 'name',
        '.add-task-form #description': 'description',
        '.add-task-form #dueOn': 'dueOn',
    },

    viewBindings: {
        '.new-to-do': {
            observe: 'addFormIsVisible',
            visible: (value) => !!value
        },
        '.open-new-to-do': {
            observe: 'addFormIsVisible',
            visible: value => !value
        },
    },

    initialize() {
        // fetch data
        this.collection.fetch();

        // init tasks list view
        this.taskCollectionView = new TaskCollectionView({
            collection: this.collection,
        });

        this.viewModel = new Backbone.Model({
            addFormIsVisible: false,
        });

        // init validation
        Backbone.Validation.bind(this);
    },

    // shows add task form animated
    showAddTodoForm() {
        this.viewModel.set('addFormIsVisible', true);
        this.$('.new-to-do').addClass('fade-in');

        _.delay(() => {
            this.$('.new-to-do').removeClass('fade-in');
        }, 500);
    },

    // hides add task form animated
    closeAddTodoForm() {
        this.$('.new-to-do').addClass('fade-out');

        _.delay(() => {
            this.viewModel.set('addFormIsVisible', false);
            this.$('.new-to-do').removeClass('fade-out');
        }, 500);
    },

    // catch form submit and saves new task model
    addToDo(e) {
        // prevend browser form submit
        e.preventDefault();

        // model validation goes there
        // if invalid - form errors will be shown
        if (this.model.isValid(true)) {
            const modelData = this.model.toJSON();
            // send server request
            this.model.save().then(res => {
                if (res.flag === 201) {
                    // success
                    this.collection.add(res.taskId);

                    new Noty({ text: 'Task created', type: 'success' }).show();

                    this.model.clear().set(this.model.defaults);
                    this.closeAddTodoForm();
                } else {
                    new Noty({ text: res.message, type: 'error' }).show();
                    this.model.clear().set(modelData);
                }
            }, e => new Noty({ text: e.responseJSON.message, type: 'error' }).show());
        }
    },

    logout() {
        // send logout request
        Api.post('user/logout').then(res => {
            if (res.flag !== 200) {
                new Noty({ text: res.message, type: 'error' }).show();
            }
            new Noty({ text: 'Good bye', type: 'success' }).show();
            localStorage.removeItem('access_token');
            App.navigate('login');
        }, e => new Noty({ text: e.responseJSON.message, type: 'error' }).show());
    },

    onRender() {
        // show list view
        this.showChildView('toDoListRegion', this.taskCollectionView);
        // init bindings
        this.stickit();
        this.stickit(this.viewModel, this.viewBindings);

        this.$('.add-task-form #dueOn').datepicker();
    }
});

export default HomeView;