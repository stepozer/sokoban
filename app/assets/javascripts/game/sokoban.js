var React                = require('react');
var ReactDOM             = require('react-dom');
var SokobanMap           = require('./components/sokoban_map');
var SokobanLevelPackages = require('./components/sokoban_level_packages');
var SokobanLevels        = require('./components/sokoban_levels');

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<SokobanMap/>, document.getElementById('sokoban-game-container'));
  // ReactDOM.render(<SokobanLevelPackages/>, document.getElementById('sokoban-level-packages-container'));
  // ReactDOM.render(<SokobanLevels/>, document.getElementById('sokoban-levels-container'));
});