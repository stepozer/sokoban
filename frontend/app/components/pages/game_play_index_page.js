import React from 'react'
import SiteMenu from '../blocks/site_menu'
import GameLevelPacks from '../blocks/game_level_packs'

module.exports = React.createClass({
  render: function()  {
    return (
      <div>
        <SiteMenu active="game_play_index" />
        <div className="row">
          <div className="col-lg-12">
            <h4>Official Puzzle Packs</h4>
            <hr/>
            <GameLevelPacks />
          </div>
        </div>
      </div>
    );
  }
});
