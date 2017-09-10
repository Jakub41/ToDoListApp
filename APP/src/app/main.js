import AppRouter from './router';

// Preconfigure notifications plugin
Noty.overrideDefaults({
  timeout: 1000,
  progressBar: false,
});

// creating custom region for page transitions animations
const MainRegion = Mn.Region.extend({
  show(view, options) {
    const _args = arguments;
    // App.vent.trigger 'loading:start'
    this.$el.addClass('page-change');

    _.delay(() =>
      Mn.Region.prototype.show.apply(this, _args)
    , 400);

    _.delay(() =>
      // App.vent.trigger 'loading:done'
      this.$el.removeClass('page-change')
    , 700);
  },
});

// configuring marionette app
const App = Mn.Application.extend({
  // setting main region
  // content will be rendered there
  region: {
    el: "#app",
    regionClass: MainRegion,
  },

  // add helper to make app navigations
  navigate(url) {
    return Backbone.history.navigate(url, true);
  },

  // setting app start handler
  // this function will run on app boot
  onStart() {
    $('#loader').hide();
    // create app router
    this.router = new AppRouter();
    // init backbone history event listener
    Backbone.history.start();
  },
});

// creating app singleton
const app = new App();

export default app;
