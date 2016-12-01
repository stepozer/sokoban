import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import routes from './routes';
import configureStore from '../store/configure_store'

const store = configureStore()

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render((
    <Provider store={store}>
      <Router children={routes} history={browserHistory} />
    </Provider>
  ), document.getElementById('react-root'));
});
