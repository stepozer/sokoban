import React from 'react'
import { connect } from 'react-redux';
import SiteMenu from '../blocks/site_menu'
import { fetchLevel } from '../../actions/level'

var LevelPage = React.createClass({
  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch(fetchLevel(this.props.routeParams.id))
  },
  render: function()  {
    var level = this.props.level
    if (! level) {
      return null;
    }

    return (
      <div>
        <SiteMenu active="site_play" />
        <div className="row">
          <div className="col-lg-12">
            <h4>{level.name}</h4>
            <hr/>
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    level: state.levelState.current
  }
}

export default connect(mapStateToProps)(LevelPage)
