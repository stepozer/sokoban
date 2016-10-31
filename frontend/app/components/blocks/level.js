import React from 'react'

var Level = React.createClass({
  componentDidMount: function() {
    window.addEventListener("keydown", this.handleKeyDown);
  },
  componentWillUnmount: function() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  handleKeyDown: function(e) {
    if (e.keyCode == SokobanKeyboardType.KEY_RIGHT) {
      e.preventDefault();
      moveHeroRight();
    } else if (e.keyCode == SokobanKeyboardType.KEY_LEFT)  {
      e.preventDefault();
      moveHeroLeft();
    } else if (e.keyCode == SokobanKeyboardType.KEY_UP) {
      e.preventDefault();
      moveHeroUp();
    } else if (e.keyCode == SokobanKeyboardType.KEY_DOWN) {
      e.preventDefault();
      moveHeroDown();
    } else if (e.keyCode == SokobanKeyboardType.KEY_U) {
      e.preventDefault();
      heroRollback();
    }
  },
  render: function() {
    var level = this.props.level;
    if (! level) {
      return null;
    }

    return (
      <div id="sokoban-game-container">
        <canvas></canvas>
      </div>
    );
  }
});

module.exports = Level
