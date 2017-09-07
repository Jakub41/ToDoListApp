import AppRouter from './router';

const MainRegion = Mn.Region.extend({
    show(view, options) {
        const _args = arguments;
        // App.vent.trigger 'loading:start'
        this.$el.addClass('page-change');

        _.delay(() =>
            Mn.Region.prototype.show.apply(this, _args), 400);

        _.delay(() =>
            // App.vent.trigger 'loading:done'
            this.$el.removeClass('page-change'), 700);
    },
});

const App = Mn.Application.extend({
    region: {
        el: "#app",
        regionClass: MainRegion,
    },

    initialize() {

    },

    navigate(url) {
        return Backbone.history.navigate(url, true);
    },

    onStart() {
        $('#loader').hide();
        this.router = new AppRouter();
        Backbone.history.start();
    },
});

const app = new App();

export default app;