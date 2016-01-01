var React       = require('react');
var SokobanCell = require('./sokoban_cell');

module.exports = React.createClass({
  render: function() {
    if (this.props.goal) {
      return <SokobanCell image="assets/img/box_goal.jpg"/>;
    } else {
      return <SokobanCell image="assets/img/box.jpg"/>;
    }
  }
});