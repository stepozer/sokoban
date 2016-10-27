import React from 'react'
import { connect } from 'react-redux';
import SiteMenu from '../blocks/site_menu'
import Levels from '../blocks/levels'
import { fetchLevelPack } from '../../actions/level_pack'

var LevelPackPage = React.createClass({
  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch(fetchLevelPack(this.props.routeParams.slug))
  },
  render: function()  {
    var levelPack = this.props.levelPack
    if (! levelPack) {
      return null;
    }

    return (
      <div>
        <SiteMenu active="site_play" />
        <div className="row">
          <div className="col-lg-12">
            <h4>{levelPack.name}</h4>
            <hr/>
            <Levels levels={levelPack.levels} />
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    levelPack: state.levelPackState.current
  }
}

export default connect(mapStateToProps)(LevelPackPage)
