var React       = require('react');
var SokobanCell = require('./sokoban_cell');

module.exports = React.createClass({
  render: function() {
    if (this.props.goal) {
      return <SokobanCell image={gon['game_box_goal']}/>;
    } else {
      return <SokobanCell image={gon['game_box']}/>;
    }
  }
});