import Template from '../../templates/register/index.html';
import App from '../../main';
import UserModel from '../../models/user';

const RegisterView = Mn.View.extend({
    className: 'register-page',
    template: _.template(Template),
    model: new UserModel(),

    // events bindings
    events: {
        'submit form': 'register',
    },

    // data bindings
    bindings: {
        '#first_name': 'first_name',
        '#last_name': 'last_name',
        '#email': 'email',
        '#username': 'username',
        '#password': 'password',
    },

    initialize() {
        // adding validation rules for register page
        this.model.validation = $.extend(true, {}, this.model.validation, {
            email: {
                required: true,
                pattern: 'email',
            },
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
            },
        });

        // init validation
        Backbone.Validation.bind(this);
    },

    register(e) {
        e.preventDefault();

        // check form
        if (this.model.isValid(true)) {
            this.model.save()
                .then(res => {
                    if (res.flag === 201) {
                        // login there
                        localStorage.setItem('access_token', res.access_token);

                        // show message
                        new Noty({ text: 'Welcome on board', type: 'success' }).show();

                        // navigate to home screen
                        App.navigate('');
                    } else {
                        // error. show message
                        new Noty({ text: res.message, type: 'error' }).show();
                    }
                }, e => {
                    new Noty({ text: e.responseJSON.message, type: 'error' }).show();
                    console.log('error', e.responseJSON.statusCode, e.responseJSON.message);
                });
        }
    },

    onRender() {
        // init bindings
        this.stickit();
    },
});

export default RegisterView;