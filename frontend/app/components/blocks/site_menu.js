import React from 'react'
import { Link } from 'react-router'

module.exports = React.createClass({
  render: function() {
    var active_menu = this.props.active;
    return (
      <div>
        <div className="header clearfix">
          <nav>
            <ul className="nav nav-pills pull-right">
              <li role="presentation" className={active_menu == 'site_index' ? 'active' : ''}>
                <Link to="/">Home</Link>
              </li>
              <li role="presentation" className={active_menu == 'site_play' ? 'active' : ''}>
                <Link to="/play">Play</Link>
              </li>
              <li role="presentation" className={active_menu == 'site_help' ? 'active' : ''}>
                <Link to="/help">Help</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
});
