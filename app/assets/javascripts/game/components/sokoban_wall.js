var React       = require('react');
var SokobanCell = require('./sokoban_cell');

module.exports = React.createClass({
  render: function() {
    return <SokobanCell image="assets/img/wall.jpg"/>;
  }
});