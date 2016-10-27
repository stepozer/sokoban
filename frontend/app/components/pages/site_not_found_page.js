import React from 'react'
import SiteMenu from '../blocks/site_menu'

module.exports = React.createClass({
  render: function()  {
    return (
      <div>
        <SiteMenu active="site_index" />
        Not found
      </div>
    );
  }
});
