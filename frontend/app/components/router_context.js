import React from 'react'
import { RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../store/configure_store'

const store = configureStore()

class AppRouterContext extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <RouterContext {...this.props} />
      </Provider>
    )
  }
}

module.exports = AppRouterContext
