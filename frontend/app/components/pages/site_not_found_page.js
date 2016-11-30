import React from 'react'
import SiteMenu from '../blocks/site_menu'

class SiteNotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <SiteMenu active="site_index" />
        Not found
      </div>
    );
  }
}

module.exports = SiteNotFoundPage
