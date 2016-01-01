var React                = require('react');
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
  componentDidMount: function() {
    window.addEventListener("keydown", this.handleKeyDown);
    SokobanMapStore.addChangeListener(this.onMapChange);
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
  onMapChange : function() {
    this.setState({ mapStore: SokobanMapStore });
  },
  getInitialState: function(){
    var levelPackage = SokobanUrlStore.queryParam('package') || 'classic';
    var levelNumber  = SokobanUrlStore.queryParam('number')  || '1';
    SokobanMapStore.parse(levelPackage, levelNumber);
    return {
      mapStore: SokobanMapStore
    };
  },
  render: function() {
    var style = { height: this.state.mapStore.cells.length * 30 };
    var cells = this.state.mapStore.cells.map(function (item, i) {
      var map_row = item.map(function (cell, j) {
        var visibleObject = cell.visibleObject();
        if (visibleObject == SokobanCellType.WALL) {
          return <SokobanWall key={j} />;
        }
        else if (visibleObject == SokobanCellType.BOX) {
          return <SokobanBox key={j} goal={cell.ground == SokobanCellType.GOAL}/>;
        }
        else if (visibleObject == SokobanCellType.GOAL) {
          return <SokobanGoal key={j}/>;
        }
        else if (visibleObject == SokobanCellType.HERO) {
          return <SokobanHero key={j} direction={cell.options.direction}/>;
        }
        else  {
          return <SokobanGround key={j}/>;
        }
      });
      return <div key={i}>{map_row}</div>;
    });

    var solved;

    if (this.state.mapStore.solved) {
      solved = (
        <div className="sokoban-solved">
          <div className="alert alert-info">
            You win!
          </div>
        </div>
      );
    }

    return (
      <div style={style}>
        {solved}
        <div className="sokoban-cells">{cells}</div>
      </div>
    );
  }
});