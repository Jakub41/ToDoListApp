class Api {
    constructor() {
        this.baseUrl = 'http://localhost:3000/';
    }

    makeRequest(options) {
        // checks stored access_token
        const accessToken = localStorage.getItem('access_token');
        // patch models url to aim on local server
        options.url = this.baseUrl + options.url;

        if (accessToken) {
            // adds access_token to request headers
            const beforeSend = options.beforeSend;
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader('authorization', accessToken);
                if (beforeSend) return beforeSend.apply(this, arguments);
            };
        }

        // make backbone standard request
        return Backbone.$.ajax.call(Backbone.$, options);
    }

    get(url) {
        const options = {
            url,
            type: 'GET',
        };

        return this.makeRequest(options);
    }

    post(url, data) {
        const options = {
            url,
            data,
            type: 'POST',
        };

        return this.makeRequest(options);
    }

    put(url, data) {
        const options = {
            url,
            data,
            type: 'PUT',
        };

        return this.makeRequest(options);
    }
}

export default new Api();