import Template from '../../templates/login/index.html';
import App from '../../main';
import UserModel from '../../models/user';
import Api from '../../api';


const LoginView = Mn.View.extend({
  className: 'login-page',
  template: _.template(Template),
  model: new UserModel(),

  // events bindings
  events: {
    'submit form': 'login',
  },

  // data bindings
  bindings: {
    '#username': 'username',
    '#password': 'password',
  },

  initialize() {
    // initialize validation
    Backbone.Validation.bind(this);
  },

  login(e) {
    e.preventDefault();

    if (this.model.isValid(true)) {
      // Login there
      Api.post('user/login', {
        username: this.model.get('username'),
        password: this.model.get('password')
      }).then(res => {
        if (res.flag === 200) {
          // Populate user model
          // this.model.set(res.user);

          // Save access_token in localstorage
          localStorage.setItem('access_token', res.user.access_token);
          // navigate to home page
          new Noty({ text: 'Welcome back!', type: 'success' }).show();
          App.navigate('');
        } else {
          new Noty({ text: res.message, type: 'error' }).show();
        }
      }, e => new Noty({ text: e.responseJSON.message, type: 'error' }).show());
    }
  },

  onRender() {
    // init binding
    this.stickit();
  }
});

export default LoginView;
