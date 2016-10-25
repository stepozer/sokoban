import React from 'react'
import { connect } from 'react-redux';
import SiteMenu from '../blocks/site_menu'
import LevelPack from '../blocks/level_pack'
import { fetchLevelPack } from '../../actions/level_pack'

var LevelPackPage = React.createClass({
  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch(fetchLevelPack())
  },
  render: function()  {
    return (
      <div>
        <SiteMenu active="_play_index" />
        <div className="row">
          <div className="col-lg-12">
            <h4>{level_pack.name}</h4>
            <hr/>
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    level_pack: state.level_pack
  }
}

export default connect(mapStateToProps)(LevelPackPage)
