var assert = require('assert');

var api = require('../api.js');

describe('cani', function(){
    describe('cast', function(){

	it('should call the api post', function(done){
            this.timeout(3400);

            // here the magic number 0 should be replaced with a
            // for(i in routes.post){ it('', () => ...post[i]... ) }
            // in order to automate testing all routes on the api
            api.routes.post[0].handler({
                body:{query:'donald trump'}
            },{
                // this is to mock the res.json responder.
                // irl, probably going to implement a promise based arch.
                //  for the api routeHandlers like
                //    api.routes.post[0].handler().then(testPredicate)
                json:function(tweets){
                    done(tweets.statuses.length?null:'no statuses returned from post route');
                }
            });
	});

	it('should call the api get', function(done){
            this.timeout(3400);
            api.routes.get[0].handler('req', {
                json:function(tweets){
                    done(tweets.statuses.length?null:'no statuses returned from get route');
                }
            });
	});

    });
});
