import React from 'react'
import { Link } from 'react-router'
import { arrayChunk } from '../../helpers/array_helper'

var Levels = React.createClass({
  renderLevelChunk: function(chunk) {
    return chunk.map(function(level, index) {
      return (
        <div className="col-md-3 level-cell" key={index}>
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
      )
    });
  },
  renderLevelChunks: function(chunks) {
    var renderLevelChunk = this.renderLevelChunk;
    return chunks.map(function(chunk, index) {
      return (
        <div className="row" key={index}>
          {renderLevelChunk(chunk)}
        </div>
      )
    });
  },
  render: function() {
    if (! this.props.levels) {
      return null;
    }
    var chunks = arrayChunk(this.props.levels, 4);
    return (
      <div>
        {this.renderLevelChunks(chunks)}
      </div>
    );
  }
});

module.exports = Levels
