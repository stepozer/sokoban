require('babel-core/register')
var express        = require('express');
var app            = express();
var React          = require('react');
var ReactDOMServer = require('react-dom/server');
var Router         = require('react-router');
var routes         = require('./components/routes.js');
var routerContext  = require('./components/router_context.js');

app.use(express.static('webroot'));

app.all('*', function(req, res, next) {
  function renderView(renderProps) {
    var factory       = React.createFactory(routerContext)
    var componentHtml = ReactDOMServer.renderToString(factory(renderProps));
    var resultHtml    =
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Sokoban Game</title>
        <link rel="stylesheet" media="all" href="/bootstrap.min.css" />
        <link rel="stylesheet" media="all" href="/site.css" />
        <script src="/bundle.js"></script>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <div id="react-root">${componentHtml}</div>
          </div>
        </div>
      </body>
    </html>
    `;

    return resultHtml;
  }

  Router.match({routes: routes, location: req.originalUrl}, function(err, redirectLocation, renderProps) {
    res.send(renderView(renderProps));
  })
});

app.listen(3001, function () {
  console.log('App listening port 3001');
})
