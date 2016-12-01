require('babel-core/register')
var express        = require('express');
var app            = express();
var React          = require('react');
var ReactDOMServer = require('react-dom/server');
var Router         = require('react-router');
var routes         = require('./components/router.js');
var routerContext  = require('./components/router_context.js');
var fetchComponentData = require('./fetchComponentData');
var promiseMiddleware = require('./promiseMiddleware');
var Redux = require('redux');
var reducers       = require('./reducers/index.js')

app.all('*', function(req, res, next) {
  const reducer  = Redux.combineReducers(reducers);
  const store    = Redux.applyMiddleware(promiseMiddleware)(Redux.createStore)(reducer);

  Router.match({routes: routes, location: req.originalUrl}, function(err, redirectLocation, renderProps) {
    function renderView() {
      var factory = React.createFactory(routerContext)
      var componentHTML  = ReactDOMServer.renderToString(factory(renderProps));
      // res.send(markup);
      // const InitialView = (
      //   <Provider store={store}>
      //     <RoutingContext {...renderProps} />
      //   </Provider>
      // );

      const componentHTML = renderToString(InitialView);

      const initialState = store.getState();

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Redux Demo</title>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }


    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  })
});

app.listen(3001, function () {
  console.log('App listening port 3001');
})
