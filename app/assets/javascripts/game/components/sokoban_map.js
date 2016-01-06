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
    for (var i in cells) {
      this.canvasRenderCell(cells[i][0], cells[i][1]);
    }
  },
  canvasRenderCell: function(x, y) {
    var c    = ReactDOM.findDOMNode(this).getElementsByTagName("canvas")[0]
    var ctx  = c.getContext("2d");
    var CELL_SIZE = 30

    var visibleObject = this.state.mapStore.cells[y][x].visibleObject();
    if (visibleObject == SokobanCellType.WALL) {
      var img = new Image();
      img.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAeAB4DAREAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAwQAAQUC/8QAGgEAAgMBAQAAAAAAAAAAAAAAAgMAAQQGB//aAAwDAQACEAMQAAABB6PzMCLFoE++pl1cTBDM57NK1lQVitdjbYLCQuoqRf/EAB0QAAMBAAIDAQAAAAAAAAAAAAECAwAEERMUM0P/2gAIAQEAAQUCBz/T9+UelyKmtFPJy0RR688UAcgFrzRh1TKhY0iQ9Zsd/8QAGhEAAgMBAQAAAAAAAAAAAAAAAAECETEQIf/aAAgBAwEBPwHkMJbxJD8I4UiiW0Rwotmi8P/EAB8RAAIBAwUBAAAAAAAAAAAAAAABEQIQMRIhIjJBUf/aAAgBAgEBPwE9ETxNNJV2dqMEv6PNvCCNxoSP/8QAIBAAAgIBAwUAAAAAAAAAAAAAAAECESFBQlEiMTJxkf/aAAgBAQAGPwIZL0iJqdtEJ1Vojwbvo0pNYFbbpEbs8kZkRant4I9R/8QAHhAAAgMAAgMBAAAAAAAAAAAAAAERITFBYRBRgaH/2gAIAQEAAT8hgK0xSY9/fgVXaa0a2b0+EfdGIW2NAWhoU74OJoHhsJdzApmvwHttThKlJtAB8kcfB//aAAwDAQACAAMAAAAQX6DR0VOS/8QAHBEBAQADAQADAAAAAAAAAAAAAQARITFRccHw/9oACAEDAQE/EJ7aC5btsg2SVgYZyd2rNpxliPb2Ufvj6k1k7ZY4G//EABwRAQEBAQEAAwEAAAAAAAAAAAERACExEEFh8P/aAAgBAgEBPxAblbLl3eNPt3bpoQ/cqJFyfb/c+Ia25lLhkYT45Shd1G5/Lv/EACIQAQACAgICAQUAAAAAAAAAAAEAESExQVFhgfBxkbHR4f/aAAgBAQABPxDbGk1QQlKhoZG0vTqPUS1bziBm4VvJv3UB3fIK8/v+sp06RVq4fPcS6Q3erRjMMjbzf0iZRTWT58ktZFAKdIJpi26dSvAoqd2oxd+VTzT8n2gAi+kNAd+ZgEak945mnR1OSf/Z';
      ctx.drawImage(img, x*CELL_SIZE,y*CELL_SIZE);
    }
    else if (visibleObject == SokobanCellType.BOX) {
      var img = new Image();
      img.src = 'data:image/jpeg;base64,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';
      ctx.drawImage(img, x*CELL_SIZE,y*CELL_SIZE);
    }
    else if (visibleObject == SokobanCellType.GOAL) {
      ctx.fillStyle = "green";
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
    else if (visibleObject == SokobanCellType.HERO) {
      ctx.fillStyle = "orange";
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
    else  {
      ctx.fillStyle = "white";
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
  },
  canvasRender: function() {
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
    var levelPackage = SokobanUrlStore.queryParam('package') || 'classic';
    var levelNumber  = SokobanUrlStore.queryParam('number')  || '1';
    SokobanMapStore.parse(levelPackage, levelNumber);
    return {
      mapStore: SokobanMapStore
    };
  },
  render: function() {
    if (this.state.mapStore.solved) {
      return (
        <div className="sokoban-solved">
          <div className="alert alert-info">
            Congratulations!
          </div>
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