'use strict';

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
var MemoryStore = require('connect').session.MemoryStore;

var dbresp = '';

app.configure(function(){
  app.set('port', process.env.PORT || process.argv[3] || 8880);
  app.use(express.favicon('./favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);

});


// load api.js, app.post from the exposures
var apiRoutes = require('./api.js');

apiRoutes.start(app);

var pwd = process.argv[2]||'';
app.get('/', function(req, res){
    res.sendfile('./'+pwd+'/index.html');
});
app.get('*', function(req, res){
    var cleanurl = req.url.split('?')[0];
    res.sendfile('./'+pwd+cleanurl);
});

app.listen(process.env.PORT|| process.argv[3] ||8880, function(){
  console.log("Express server listening on port " + app.get('port'));
});

