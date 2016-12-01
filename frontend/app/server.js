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
            <div id="react-root">
              <!--
                This div needed for react server rendering:

                http://stackoverflow.com/questions/33521047/warning-react-attempted-to-reuse-markup-in-a-container-but-the-checksum-was-inv

                Why does this work? On the client, React has a propensity to wrap its rendering of your root component
                with a superfluous div. ReactDOMServer.render doesn't seem to behave in this manner, thus when one renders
                into the same container isomorphically, the Adler-32 checksum of your DOM differs.
              -->
              <div>
                ${componentHtml}
              </div>
            </div>
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
