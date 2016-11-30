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

class Level extends React.Component {
  componentDidMount() {
    this.imagesLoaded = 0;
    this.images = {
      // TODO: get it from API
      wall:     { url: 'http://localhost:3000/game/wall.jpg',     obj: null },
      goal:     { url: 'http://localhost:3000/game/goal.jpg',     obj: null },
      hero_up:  { url: 'http://localhost:3000/game/hero_up.jpg',  obj: null },
      box:      { url: 'http://localhost:3000/game/box.jpg',      obj: null },
      box_goal: { url: 'http://localhost:3000/game/box_goal.jpg', obj: null },
    };
    this.loadAllImages();
    this.renderCanvas();
    self = this;
    window.addEventListener('keydown', function(e) {
      self.handleKeyDown(e)
    });
  }

  isAllImagesLoaded() {
    return this.imagesLoaded >= Object.keys(this.images).length;
  }

  loadAllImages() {
    var self = this;
    for (var key in this.images) {
      this.images[key].obj = new Image();
      this.images[key].obj.onload = function() {
        self.imagesLoaded += 1;
      }
      this.images[key].obj.src = this.images[key].url;
    }
  }

  componentDidUpdate() {
    this.renderCanvas();
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  renderCanvas() {
    if (this.state.map.solved) {
      return;
    }
    if (!this.isAllImagesLoaded()) {
      var self = this;
      setTimeout(function() { self.renderCanvas(); }, 100);
    }

    var c    = ReactDOM.findDOMNode(this).getElementsByTagName("canvas")[0]
    var ctx  = c.getContext("2d");
    var x
    var y
    c.width  = this.state.map.sizeX * 30;
    c.height = this.state.map.sizeY * 30;

    for (y in this.state.map.cells) {
      for (x in this.state.map.cells[y]) {
        this.renderCanvasCell(x, y, ctx);
      }
    }
  }

  renderCanvasCell(x, y, ctx) {
    var obj    = this.state.map.cells[y][x];
    var imgObj = false;

    if (obj == GAME_CELL_WALL) {
      imgObj = this.images.wall.obj;
    }
    else if (obj == GAME_CELL_GOAL) {
      imgObj = this.images.goal.obj;
    }
    else if (obj == GAME_CELL_HERO) {
      imgObj = this.images.hero_up.obj;
    }
    else if (obj == GAME_CELL_HERO_ON_GOAL) {
      imgObj = this.images.hero_up.obj;
    }
    else if (obj == GAME_CELL_BOX) {
      imgObj = this.images.box.obj;
    }
    else if (obj == GAME_CELL_BOX_ON_GOAL) {
      imgObj = this.images.box_goal.obj;
    }

    if (imgObj) {
      ctx.drawImage(imgObj, x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
    } else {
      ctx.fillStyle = 'white';
      ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
    }
  }

  moveHero(direction) {
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
      this.renderCanvas();
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
      this.renderCanvas();
      return
    }
  }

  handleKeyDown(e) {
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
  }

  setInitialComponentState() {
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
  }

  render() {
    this.setInitialComponentState();

    return (
      <div id="sokoban-game-container">
        <canvas></canvas>
      </div>
    );
  }
}

export default connect()(Level)
