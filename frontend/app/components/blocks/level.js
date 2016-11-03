import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
  KEY_LEFT,
  KEY_RIGHT,
  KEY_UP,
  KEY_DOWN,
  KEY_U
} from '../../constants/keyboard_types'
import {
  GAME_CELL_GROUND,
  GAME_CELL_WALL,
  GAME_CELL_BOX,
  GAME_CELL_GOAL,
  GAME_CELL_HERO,
  GAME_CELL_HERO_ON_GOAL,
  GAME_CELL_BOX_ON_GOAL
} from '../../constants/game_cell_types'
import { gameIncrementSteps } from '../../actions/level'

const CELL_SIZE = 30

var Level = React.createClass({
  moveHeroRight: function() {
    const { dispatch } = this.props;
    dispatch(gameIncrementSteps());
    this.state.map.cells[0][0] = ' '
    this.state.map.cells[0][1] = '@'
    this.canvasRender();
  },
  moveHeroLeft: function() {
    const { dispatch } = this.props;
    dispatch(gameIncrementSteps());
    this.state.map.cells[0][0] = '@'
    this.state.map.cells[0][1] = ' '
    this.canvasRender();
  },
  componentDidMount: function() {
    window.addEventListener("keydown", this.handleKeyDown);
    this.canvasRender();
  },
  componentDidUpdate: function() {
    this.canvasRender();
  },
  componentWillUnmount: function() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  canvasRender: function() {
    if (this.state.map.solved) {
      return;
    }

    var c    = ReactDOM.findDOMNode(this).getElementsByTagName("canvas")[0]
    var ctx  = c.getContext("2d");
    var x
    var y
    c.width  = this.state.map.sizeX * 30;
    c.height = this.state.map.sizeY * 30;

    for (y in this.state.map.cells) {
      for (x in this.state.map.cells[y]) {
        this.canvasRenderCell(x, y, ctx);
      }
    }
  },
  canvasRenderCell: function(x, y, ctx) {
    if (this.state.map.solved) {
      return;
    }

    var visibleObject = this.state.map.cells[y][x];
    if (visibleObject == GAME_CELL_WALL) {
      ctx.fillStyle = 'red';
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
    else if (visibleObject == GAME_CELL_GOAL) {
      ctx.fillStyle = 'green';
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
    else if (visibleObject == GAME_CELL_HERO) {
      ctx.fillStyle = 'blue';
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
    else if (visibleObject == GAME_CELL_HERO_ON_GOAL) {
      ctx.fillStyle = 'gray';
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
    else if (visibleObject == GAME_CELL_BOX) {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
    else if (visibleObject == GAME_CELL_BOX_ON_GOAL) {
      ctx.fillStyle = 'orrange';
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
    else  {
      ctx.fillStyle = 'white';
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
  },
  handleKeyDown: function(e) {
    if (e.keyCode == KEY_RIGHT) {
      e.preventDefault();
      this.moveHeroRight();
    } else if (e.keyCode == KEY_LEFT)  {
      e.preventDefault();
      this.moveHeroLeft();
    } else if (e.keyCode == KEY_UP) {
      e.preventDefault();
      moveHeroUp();
    } else if (e.keyCode == KEY_DOWN) {
      e.preventDefault();
      moveHeroDown();
    } else if (e.keyCode == KEY_U) {
      e.preventDefault();
      moveHeroBack();
    }
  },
  render: function() {
    console.log('RENDER')
    this.state = {
      map: {
        solved: false,
        cells:  this.props.level.level,
        sizeX:  this.props.level.size_x,
        sizeY:  this.props.level.size_y,
      }
    }

    return (
      <div id="sokoban-game-container">
        <canvas></canvas>
      </div>
    );
  }
});

export default connect()(Level)
