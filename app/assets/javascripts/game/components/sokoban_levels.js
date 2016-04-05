var React        = require('react');
// var SokobanLevel = require('./sokoban_level');

module.exports = React.createClass({
  render: function() {
    var ss = []
    for (var i = 1; i <= 55; i++) {
      ss.push(i);
    }
    var levels = ss.map(function(level) {
      return (
        <SokobanLevel package="classic" level={level} key={level} />
      );
    });
    return (
      <div className="sokoban-levels">
        {levels}
      </div>
    );
  }
})
