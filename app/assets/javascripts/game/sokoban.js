var React         = require('react');
var ReactDOM      = require('react-dom');
var SokobanMap    = require('./components/sokoban_map');
var SokobanLevels = require('./components/sokoban_levels');

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<SokobanMap/>, document.getElementById('sokoban-game-container'));
});