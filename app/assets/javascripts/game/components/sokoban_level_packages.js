var React        = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="sokoban-packages row">
        <div className="col-md-2 text-center">
          <img src="./assets/img/packs/tutorials.jpg" className="img-responsive" />
          Tutorials
        </div>
        <div className="col-md-2 text-center">
          <img src="./assets/img/packs/classic.jpg" className="img-responsive" />
          Classic
        </div>
      </div>
    );
  }
})
