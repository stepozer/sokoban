import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import SiteIndexPage from './pages/site_index_page'
import SiteHelpPage from './pages/site_help_page'
import SiteNotFoundPage from './pages/site_not_found_page'
import LevelPacksPage from './pages/level_packs_page'
import LevelPackPage from './pages/level_pack_page'
import LevelPage from './pages/level_page'

module.exports = (
  <Router>
    <Route path="/"               component={SiteIndexPage}/>
    <Route path="/help"           component={SiteHelpPage}/>
    <Route path="/play/:slug"     component={LevelPackPage}/>
    <Route path="/play"           component={LevelPacksPage}/>
    <Route path="/play/:slug/:id" component={LevelPage}/>
    <Route path="*"               component={SiteNotFoundPage} />
  </Router>
)
