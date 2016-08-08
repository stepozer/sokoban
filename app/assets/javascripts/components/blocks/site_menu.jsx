var Link     = ReactRouter.Link
var SiteMenu = React.createClass({
  render: function() {
    active_menu = this.props.active;
    return (
      <div>
        <div className="header clearfix">
          <nav>
            <ul className="nav nav-pills pull-right">
              <li role="presentation" className={active_menu == 'site_index' ? 'active' : ''}>
                <Link to="/">Home</Link>
              </li>
              <li role="presentation" className={active_menu == 'game_play' ? 'active' : ''}>
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
