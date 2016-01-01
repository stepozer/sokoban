var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="sokoban-cell">
        <img src={''+this.props.image} alt="" />
      </div>
    );
  }
});