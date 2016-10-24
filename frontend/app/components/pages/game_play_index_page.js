import React from 'react'
import { connect } from 'react-redux';
import SiteMenu from '../blocks/site_menu'
import GameLevelPacks from '../blocks/game_level_packs'
import { fetchLevelPacks } from '../../actions/level_pack'

var GamePlayIndexPage = React.createClass({
  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch(fetchLevelPacks())
  },
  render: function()  {
    return (
      <div>
        <SiteMenu active="game_play_index" />
        <div className="row">
          <div className="col-lg-12">
            <h4>Official Puzzle Packs</h4>
            <hr/>
            <GameLevelPacks level_packs={this.props.level_packs}/>
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    level_packs: state.level_packs
  }
}

export default connect(mapStateToProps)(GamePlayIndexPage)
