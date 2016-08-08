var Router         = ReactRouter.Router;
var Route          = ReactRouter.Route;
var browserHistory = ReactRouter.hashHistory;

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route name="site_index" path="/"     component={SiteIndexPage}/>
      <Route name="site_help"  path="/help" component={SiteHelpPage}/>
      <Route path="*" component={SiteNotFoundPage} />
    </Router>
  ),document.getElementById('root'));
});
