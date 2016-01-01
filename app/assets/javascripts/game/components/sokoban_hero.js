var React       = require('react');
var SokobanCell = require('./sokoban_cell');

module.exports = React.createClass({
  render: function() {
    if (this.props.direction == 'left') {
      return <SokobanCell image="assets/img/hero_left.jpg"/>;
    } else if (this.props.direction == 'right') {
      return <SokobanCell image="assets/img/hero_right.jpg"/>;
    } else if (this.props.direction == 'down') {
      return <SokobanCell image="assets/img/hero_down.jpg"/>;
    } else {
      return <SokobanCell image="assets/img/hero_up.jpg"/>;
    }
  }
})
