import App from './main';
import HomeView from './views/home';
import LoginView from './views/login';
import RegisterView from './views/register';

export default {
    home() {
        App.showView(new HomeView());
    },

    login() {
        App.showView(new LoginView());
    },

    register() {
        App.showView(new RegisterView());
    },
};