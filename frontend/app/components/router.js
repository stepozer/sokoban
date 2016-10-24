import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'
import SiteIndexPage from './pages/site_index_page'
import SiteHelpPage from './pages/site_help_page'
import SiteNotFoundPage from './pages/site_not_found_page'
import GamePlayIndexPage from './pages/game_play_index_page'
import configureStore from '../store/configure_store'

const store = configureStore()

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render((
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/"     component={SiteIndexPage}/>
        <Route path="/help" component={SiteHelpPage}/>
        <Route path="/play" component={GamePlayIndexPage}/>
        <Route path="*"     component={SiteNotFoundPage} />
      </Router>
    </Provider>
  ), document.getElementById('root'));
});
