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
    if (! this.props.levelPack) {
      return null;
    }

    return (
      <div>
        <SiteMenu active="site_play" />
        <div className="row">
          <div className="col-lg-12">
            <h4>{this.props.levelPack.name}</h4>
            <hr/>
            <Levels levels={this.props.levels} />
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    levels: state.levelPackState.current.levels,
    levelPack: state.levelPackState.current.level_pack,
  }
}

export default connect(mapStateToProps)(LevelPackPage)
