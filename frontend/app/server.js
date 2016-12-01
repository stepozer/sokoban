require('babel-core/register')
var express        = require('express');
var app            = express();
var React          = require('react');
var ReactDOMServer = require('react-dom/server');
var Router         = require('react-router');
var routes         = require('./components/router.js');
var routerContext  = require('./components/router_context.js');

app.all('*', function(req, res, next) {
  Router.match({routes: routes, location: req.originalUrl}, function(err, redirectLocation, renderProps) {
    var factory = React.createFactory(routerContext)
    var markup  = ReactDOMServer.renderToString(factory(renderProps));
    res.send(markup);
  })
});

app.listen(3001, function () {
  console.log('App listening port 3001');
})
