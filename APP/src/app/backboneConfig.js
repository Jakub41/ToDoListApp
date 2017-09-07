import Backbone from 'backbone';
import 'backbone.stickit';
import 'backbone-validation';
import Api from './api';

Backbone.VERSION = '1.3.3_customed';

const backboneSync = Backbone.sync;

Backbone.ajax = function() {
    return Api.makeRequest.apply(Backbone.$, arguments);
};

Backbone.ajaxSync = backboneSync;

_.extend(Backbone.Validation.callbacks, {
    // Gets called when a previously invalid field in the
    // view becomes valid. Removes any error message.
    valid: function(view, attr, selector) {
        view.$('[' + selector + '~="' + attr + '"]')
            .removeClass('invalid')
            .parent()
            .find('.error-msg')
            .hide();
    },

    // Gets called when a field in the view becomes invalid.
    // Adds a error message.
    invalid: function(view, attr, error, selector) {
        var $input = view.$('[' + selector + '~="' + attr + '"]');

        if ($input.length === 0) {
            return;
        }

        var $msg = $input.parent().find('.error-msg');

        if ($msg.length === 0) {
            $msg = $input
                .parent()
                .append('<div class="error-msg"></div>')
                .find('.error-msg');
        }
        $msg.html(error).show();
        $input.addClass('invalid');
    }
});