var React       = require('react');
var SokobanCell = require('./sokoban_cell');

module.exports = React.createClass({
  render: function() {
    if (this.props.direction == 'left') {
      return <SokobanCell image={gon['game_hero_left']}/>;
    } else if (this.props.direction == 'right') {
      return <SokobanCell image={gon['game_hero_right']}/>;
    } else if (this.props.direction == 'down') {
      return <SokobanCell image={gon['game_hero_down']}/>;
    } else {
      return <SokobanCell image={gon['game_hero_up']}/>;
    }
  }
})
