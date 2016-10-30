import React from 'react'
import { Link } from 'react-router'

var Levels = React.createClass({
  render: function() {
    if (! this.props.levels) {
      return null;
    }

    var chunks = this.props.levels;

    // var levelsTemplate = chunks.map(function(chunk, index) {
    var levelsTemplate = chunks.map(function(level, index) {
      return (
        <div className="row" key={index}>
            <div className="col-md-3 level-cell">
              <div className="row">
                <div className="col-md-7">
                  <div className="level-image">
                    <Link to={{pathname: '/play/'+level.level_pack_slug+'/'+level.id }}>
                      <img src={ level.image } alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-md-5">
                  <Link to={{pathname: '/play/'+level.level_pack_slug+'/'+level.id }}>
                    <h4>#{level.name}</h4>
                  </Link>
                </div>
              </div>
            </div>
        </div>
      )
    });

    return (
      <div>
        {levelsTemplate}
      </div>
    );
  }
});

module.exports = Levels
