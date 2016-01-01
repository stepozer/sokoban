var React            = require('react');
var Dispatcher       = require('../dispatcher/app_dispatcher');
var SokobanEventType = require('../types/sokoban_event_type');

module.exports = React.createClass({
  handleClick: function() {
    Dispatcher.dispatch({
      eventName: SokobanEventType.LEVEL_LOAD,
      package:   this.props.package,
      level:     this.props.level
    });
  },
  render: function() {
    var level_img = './assets/img/levels/'+ this.props.package + '/' + this.props.level + '.png';
    return (
      <div className="sokoban-level col-md-2" onClick={this.handleClick}>
        <div><img src={level_img} className="img-responsive"/></div>
        <div>Level {this.props.level}</div>
      </div>
    );
  }
})