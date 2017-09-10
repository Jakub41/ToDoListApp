const UserModel = Backbone.Model.extend({
  defaults: {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  },

  url: 'user',

  validation: {
    username: {
      required: true,
    },
    password: {
      required: true,
      minLength: 6,
    }
  }
});

export default UserModel;
