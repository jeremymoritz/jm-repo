
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
// app.set('port', process.env.PORT || 80);  //  if using this line, you MUST run the command with sudo (e.g. "sudo nodemon app.js")!
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon('./public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function routeToPage(req, res) {
  var pageCalled = req.params.pageCalled;

  console.log('Calling Page: ' + pageCalled);

  if(routes[pageCalled] && typeof routes[pageCalled] === 'function') {
    routes[pageCalled](req, res);
  } else {
    res.send('Error: This page does not exist.');
  }
}

app.get('/:pageCalled', function(req, res) {
  routeToPage(req, res);
});
app.get('/', function(req, res) {
  req.params.pageCalled = 'index';
  routeToPage(req, res);
});
app.post('/:pageCalled', function(req, res) {
  routes.handlePost(req, res);
  routeToPage(req, res);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
