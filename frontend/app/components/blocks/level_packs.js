import React from 'react'
import { Link } from 'react-router'

class LevelPacks extends React.Component {
  render() {
    if (! this.props.level_packs) {
      return null;
    }

    var levelPacksTemplate = this.props.level_packs.map(function(level_pack, index)  {
      return (
        <div className="col-md-6" key={index}>
          <div className="row">
            <div className="col-md-3">
              <img src={level_pack.image} alt="" className="level-pack-img" />
            </div>
            <div className="col-md-9">
              <h4>
                <Link to={{pathname: '/play/'+level_pack.slug }}>{level_pack.name}</Link>
              </h4>
              <p>
                <strong>{level_pack.levels_count}</strong> puzzle
              </p>
            </div>
          </div>
        </div>
      )
    });

    return (
      <div className="row">
        {levelPacksTemplate}
      </div>
    );
  }
}

module.exports = LevelPacks
