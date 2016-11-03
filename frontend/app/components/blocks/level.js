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
import {
  GAME_DIRECTION_RIGHT,
  GAME_DIRECTION_LEFT,
  GAME_DIRECTION_UP,
  GAME_DIRECTION_DOWN
} from '../../constants/game_direction_types'
import { gameIncrementSteps } from '../../actions/level'

const CELL_SIZE = 30

var Level = React.createClass({
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
      ctx.fillStyle = 'purple';
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
    else  {
      ctx.fillStyle = 'white';
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
  },
  moveHero: function(direction) {
    if (this.state.map.solved) {
      return;
    }
    var x         = this.state.map.heroX;
    var y         = this.state.map.heroY;
    var to_x      = x;
    var to_y      = y;
    var to_x_next = x;
    var to_y_next = y;
    if      (direction == GAME_DIRECTION_RIGHT) { to_x = x + 1; to_x_next = x + 2; }
    else if (direction == GAME_DIRECTION_LEFT)  { to_x = x - 1; to_x_next = x - 2; }
    else if (direction == GAME_DIRECTION_UP)    { to_y = y - 1; to_y_next = y - 2; }
    else                                        { to_y = y + 1; to_y_next = y + 2; }
    if (
      to_x < 0 ||
      to_y < 0 ||
      typeof(this.state.map.cells[to_y]) == 'undefined' ||
      typeof(this.state.map.cells[to_y][to_x]) == 'undefined'
    ) {
      return;
    }

    if (
      this.state.map.cells[to_y][to_x] == GAME_CELL_GROUND ||
      this.state.map.cells[to_y][to_x] == GAME_CELL_GOAL
    ) {
      // this.steps += 1;
      // this.saveHistory(direction);
      if (this.state.map.cells[y][x] == GAME_CELL_HERO_ON_GOAL) {
        this.state.map.cells[y][x] = GAME_CELL_GOAL;
      } else {
        this.state.map.cells[y][x] = GAME_CELL_GROUND;
      }
      if (this.state.map.cells[to_y][to_x] == GAME_CELL_GOAL) {
        this.state.map.cells[to_y][to_x] = GAME_CELL_HERO_ON_GOAL;
      } else {
        this.state.map.cells[to_y][to_x] = GAME_CELL_HERO;
      }
      this.state.map.heroX = to_x;
      this.state.map.heroY = to_y;
      // this.checkSolved();
      this.canvasRender();
      return
    }

    if (
      (
        this.state.map.cells[to_y][to_x] == GAME_CELL_BOX ||
        this.state.map.cells[to_y][to_x] == GAME_CELL_BOX_ON_GOAL
      ) &&
      (
        this.state.map.cells[to_y_next][to_x_next] == GAME_CELL_GROUND ||
        this.state.map.cells[to_y_next][to_x_next] == GAME_CELL_GOAL
      )
    ) {
      // this.steps += 1;
      // this.saveHistory(direction);
      if (this.state.map.cells[y][x] == GAME_CELL_HERO_ON_GOAL) {
        this.state.map.cells[y][x] = GAME_CELL_GOAL;
      } else {
        this.state.map.cells[y][x] = GAME_CELL_GROUND;
      }
      if (this.state.map.cells[to_y][to_x] == GAME_CELL_BOX_ON_GOAL) {
        this.state.map.cells[to_y][to_x] = GAME_CELL_HERO_ON_GOAL;
      } else {
        this.state.map.cells[to_y][to_x] = GAME_CELL_HERO;
      }
      if (this.state.map.cells[to_y_next][to_x_next] == GAME_CELL_GOAL) {
        this.state.map.cells[to_y_next][to_x_next] = GAME_CELL_BOX_ON_GOAL
      } else {
        this.state.map.cells[to_y_next][to_x_next] = GAME_CELL_BOX
      }
      
      this.state.map.heroX = to_x;
      this.state.map.heroY = to_y;
      // this.checkSolved();
      this.canvasRender();
      return
    }
  },
  handleKeyDown: function(e) {
    if (e.keyCode == KEY_RIGHT) {
      e.preventDefault();
      this.moveHero(GAME_DIRECTION_RIGHT);
    } else if (e.keyCode == KEY_LEFT)  {
      e.preventDefault();
      this.moveHero(GAME_DIRECTION_LEFT);
    } else if (e.keyCode == KEY_UP) {
      e.preventDefault();
      this.moveHero(GAME_DIRECTION_UP);
    } else if (e.keyCode == KEY_DOWN) {
      e.preventDefault();
      this.moveHero(GAME_DIRECTION_DOWN);
    } else if (e.keyCode == KEY_U) {
      e.preventDefault();
      moveHeroBack();
    }
  },
  setInitialComponentState: function() {
    var x;
    var y;

    this.state = {
      map: {
        solved: false,
        cells:  this.props.level.level,
        sizeX:  this.props.level.size_x,
        sizeY:  this.props.level.size_y,
      }
    }

    for (y in this.state.map.cells) {
      for (x in this.state.map.cells[y]) {
        if (this.state.map.cells[y][x] == GAME_CELL_HERO ||
            this.state.map.cells[y][x] == GAME_CELL_HERO_ON_GOAL
        ) {
          this.state.map.heroX = parseInt(x);
          this.state.map.heroY = parseInt(y);
        }
      }
    }
  },
  render: function() {
    this.setInitialComponentState();

    return (
      <div id="sokoban-game-container">
        <canvas></canvas>
      </div>
    );
  }
});

export default connect()(Level)
