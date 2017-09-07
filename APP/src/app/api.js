const Api = (function() {
    const baseUrl = 'http://localhost:3000/';

    function makeRequest(options) {
        const accessToken = localStorage.getItem('access_token');
        options.url = baseUrl + options.url;

        if (accessToken) {
            let beforeSend = options.beforeSend;
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader('authorization', accessToken);
                if (beforeSend) return beforeSend.apply(this, arguments);
            };
        }

        return Backbone.$.ajax.call(Backbone.$, options);
    }

    function get(url) {
        const options = {
            url,
            type: 'GET',
        };

        return makeRequest(options);
    }

    function post(url, data) {
        const options = {
            url,
            data,
            type: 'POST',
        };

        return makeRequest(options);
    }

    function put(url, data) {
        const options = {
            url,
            data,
            type: 'PUT',
        };

        return makeRequest(options);
    }

    return {
        makeRequest,
        get,
        post,
        put,
    }
})();

export default Api;