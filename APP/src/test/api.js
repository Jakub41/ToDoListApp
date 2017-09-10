import Api from '../app/api';
import expect from 'expect.js';
import sinon from 'sinon';
import Backbone from 'backbone';


const sandbox = sinon.sandbox.create();
global.localStorage = sinon.stub({
    getItem: () => 'abc'
});

Backbone.$.ajax = sinon.spy();

describe('testing Api', function() {
    let get = sinon.spy(Api, 'get');
    let post = sinon.spy(Api, 'post');
    let put = sinon.spy(Api, 'put');
    let makeRequest = sinon.spy(Api, 'makeRequest');


    afterEach(function() {
        sandbox.restore();
    });

    it('should be not null', function() {
        expect(Api).not.to.be(null);
    });

    it('get should call makeRequest', function() {
        let url = 'test';

        Api.get(url);

        expect(makeRequest.calledOnce).to.be(true);
        expect(makeRequest.args[0][0].url).to.be('http://localhost:3000/test');
    });

    it('post should call makeRequest', function() {
        let url = 'test';

        Api.post(url, {});

        expect(makeRequest.callCount).to.be(2);
        expect(makeRequest.args[1][0].url).to.be('http://localhost:3000/test');
        expect(makeRequest.args[1][0].type).to.be('POST');
    });

    it('put should call makeRequest', function() {
        let url = 'test';

        Api.put(url, {});

        expect(makeRequest.callCount).to.be(3);
        expect(makeRequest.args[2][0].url).to.be('http://localhost:3000/test');
        expect(makeRequest.args[2][0].type).to.be('PUT');
    });
});