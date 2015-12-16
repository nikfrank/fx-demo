'use strict';

var Twitter = require('twitter');

var twitterSecrets;

try{
    twitterSecrets = require('./secret/twitter.js');
}catch(e){
    twitterSecrets = {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    };
}

var client = new Twitter(twitterSecrets);

module.exports = {
    routes:{
        post:[{
            route:'/read',
            handler:function(req, res){ // {body:{query}} except that destructuring is not yet in node
                //https://kangax.github.io/compat-table/es6/
                client.get('search/tweets', {q: req.body.query}, function(error, tweets, response){
                    res.json(tweets);
                });
            }
        }],


        get:[{
            route:'/read',
            handler:function(req, res){
                client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response){
                    res.json(tweets);
                });
            }
        }]
    },

    start:function(app){
        for(let verb in this.routes)
            for(let i=this.routes[verb].length; i-->0;)
                app[verb](this.routes[verb][i].route, this.routes[verb][i].handler);
        // could put auth middleware?
    }
};
