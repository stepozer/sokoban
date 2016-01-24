var React                = require('react');
var ReactDOM             = require('react-dom');
var Dispatcher           = require('../dispatcher/app_dispatcher');
var SokobanMapStore      = require('../stores/sokoban_map_store');
var SokobanUrlStore      = require('../stores/sokoban_url_store');
var SokobanDirectionType = require('../types/sokoban_direction_type');
var SokobanKeyboardType  = require('../types/sokoban_keyboard_type');
var SokobanCellType      = require('../types/sokoban_cell_type');
var SokobanGround        = require('../components/sokoban_ground');
var SokobanWall          = require('../components/sokoban_wall');
var SokobanHero          = require('../components/sokoban_hero');
var SokobanBox           = require('../components/sokoban_box');
var SokobanGoal          = require('../components/sokoban_goal');

module.exports = React.createClass({
  statics: {
    CELL_SIZE: 30
  },
  componentDidMount: function() {
    window.addEventListener("keydown", this.handleKeyDown);
    SokobanMapStore.addChangeListener(this.onMapChange);
    this.canvasRender();
  },
  componentWillUnmount: function() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  handleKeyDown: function(e) {
    if (e.keyCode == SokobanKeyboardType.KEY_RIGHT) {
      e.preventDefault();
      this.state.mapStore.moveHero(SokobanDirectionType.RIGHT);
    } else if (e.keyCode == SokobanKeyboardType.KEY_LEFT)  {
      e.preventDefault();
      this.state.mapStore.moveHero(SokobanDirectionType.LEFT);
    } else if (e.keyCode == SokobanKeyboardType.KEY_UP) {
      e.preventDefault();
      this.state.mapStore.moveHero(SokobanDirectionType.UP);
    } else if (e.keyCode == SokobanKeyboardType.KEY_DOWN) {
      e.preventDefault();
      this.state.mapStore.moveHero(SokobanDirectionType.DOWN);
    } else if (e.keyCode == SokobanKeyboardType.KEY_U) {
      e.preventDefault();
      this.state.mapStore.rollback();
    }
  },
  onMapChange : function(cells) {
    this.setState({ mapStore: SokobanMapStore });
    if (cells) {
      for (var i in cells) {
        this.canvasRenderCell(cells[i][0], cells[i][1]);
      }
    } else {
      this.canvasRender();
    }
  },
  canvasRenderCell: function(x, y) {
    if (this.state.mapStore.solved) {
      return;
    }
    var c         = ReactDOM.findDOMNode(this).getElementsByTagName("canvas")[0]
    var ctx       = c.getContext("2d");
    var cell_size = this.constructor.CELL_SIZE;

    var visibleObject = this.state.mapStore.cells[y][x].visibleObject();
    if (visibleObject == SokobanCellType.WALL) {
      SokobanWall.draw(ctx, x, y, cell_size);
    }
    else if (visibleObject == SokobanCellType.BOX) {
      SokobanBox.draw(ctx, x, y, cell_size, this.state.mapStore.cells[y][x].ground == SokobanCellType.GOAL);
    }
    else if (visibleObject == SokobanCellType.GOAL) {
      SokobanGoal.draw(ctx, x, y, cell_size);
    }
    else if (visibleObject == SokobanCellType.HERO) {
      SokobanHero.draw(ctx, x, y, cell_size, this.state.mapStore.cells[y][x].options.direction);
    }
    else  {
      SokobanGround.draw(ctx, x, y, cell_size);
    }
  },
  canvasRender: function() {
    if (this.state.mapStore.solved) {
      return;
    }
    var c    = ReactDOM.findDOMNode(this).getElementsByTagName("canvas")[0]
    c.width  = this.state.mapStore.cols*30;
    c.height = this.state.mapStore.rows*30;

    for (y in this.state.mapStore.cells) {
      for (x in this.state.mapStore.cells[y]) {
        this.canvasRenderCell(x, y);
      }
    }
  },
  getInitialState: function(){
    SokobanMapStore.parse(gon.sokoban_level, gon.sokoban_level_id);
    return {
      mapStore: SokobanMapStore
    };
  },
  render: function() {
    if (this.state.mapStore.solved) {
      return (
        <div className="sokoban-solved">
          <div className="alert alert-info">
            Congratulations! Puzzle Solved!
          </div>
          <p>Your score was not saved because you're not logged in.</p>
          <p>Would you like to login or sign up?</p>
          <a className="btn btn-primary" href={gon['sokoban_next_level_url']}>Play Next Puzzle</a>
        </div>
      );
    } else {
      return (
        <div className="sokoban-map">
          <canvas></canvas>
        </div>
      );
    }
  }
});