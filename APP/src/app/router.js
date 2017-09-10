import RouterController from './routerController';
import App from './main';

// App main router
const AppRouter = Mn.AppRouter.extend({
  // setting routes map
  appRoutes: {
    '': 'home',
    'login': 'login',
    'register': 'register',
  },

  // adding controller layer
  controller: RouterController,

  // BackBone function midleware to run on every root change
  // checks for user to be logged and redirects on login if not
  execute(callback, args, name) {
    const isLogged = localStorage.getItem('access_token');

    if (['login', 'register'].indexOf(name) === -1 && !isLogged) {
      App.navigate('login');
      return false;
    }

    if (callback) callback.apply(this, args);
  },
});

export default AppRouter;
