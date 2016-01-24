var classicLevels        = require('../levels/classic.js');
var albertoBorellaLevels = require('../levels/alberto_borella.js');
var SokobanUrlStore      = require('../stores/sokoban_url_store');
var SokobanCellStore     = require('../stores/sokoban_cell_store');
var SokobanRawCellType   = require('../types/sokoban_raw_cell_type');
var SokobanCellType      = require('../types/sokoban_cell_type');
var SokobanDirectionType = require('../types/sokoban_direction_type');
var Dispatcher           = require('../dispatcher/app_dispatcher');

function SokobanMapStore() {
  this.onChangeCallback = null;
  this.history = { solution: "", positions: [] };
  this.cells   = [];
  this.hero    = null;
  this.solved  = false;
  this.cols    = 0;
  this.rows    = 0;
  this.steps   = 0;
  this.levels  = {
    'tutorials'       : [],
    'classic'         : classicLevels,
    'alberto_borella' : albertoBorellaLevels
  };

  this.addChangeListener = function(callback) {
    this.onChangeCallback = callback;
  }

  this.parse = function(level, level_id) {
    level         = level.split("!");
    this.solved   = false;
    var history   = [];
    var line      = null;
    var y         = null;
    var x         = null;
    var real_x    = 0;
    var real_y    = 0;
    this.cells    = [];
    this.level_id = level_id;
    for (y in level) {
      if (level[y] == '') {
        continue;
      }
      line = [];
      real_x = 0;
      for (x in level[y]) {
        line.push(this.parseLine(level[y][x], real_x, real_y));
        real_x = real_x + 1;
      }
      real_y = real_y + 1;
      this.cells.push(line);
      this.cols = Math.max(this.cols, line.length);
    }
    this.rows = this.cells.length;
  }

  this.parseLine = function(cell, x, y) {
    if (cell == SokobanRawCellType.WALL) {
      return new SokobanCellStore(SokobanCellType.WALL, SokobanCellType.GROUND, x, y);
    } else if (cell == SokobanRawCellType.BOX) {
      return new SokobanCellStore(SokobanCellType.GROUND, SokobanCellType.BOX, x, y);
    } else if (cell == SokobanRawCellType.GOAL) {
      return new SokobanCellStore(SokobanCellType.GOAL, SokobanCellType.GROUND, x, y);
    } else if (cell == SokobanRawCellType.HERO) {
      this.hero = new SokobanCellStore(SokobanCellType.GROUND, SokobanCellType.HERO, x, y);
      return this.hero;
    } else if (cell == SokobanRawCellType.HERO_ON_GOAL) {
      this.hero = new SokobanCellStore(SokobanCellType.GROUND, SokobanCellType.HERO, x, y);
      return this.hero;
    } else if (cell == SokobanRawCellType.BOX_ON_GOAL) {
      return new SokobanCellStore(SokobanCellType.GOAL, SokobanCellType.BOX, x, y);
    } else {
      return new SokobanCellStore(SokobanCellType.GROUND, SokobanCellType.GROUND, x, y);
    }
  }

  this.moveHero = function(direction) {
    if (this.solved) {
      return;
    }
    var x         = this.hero.x;
    var y         = this.hero.y;
    var to_x      = x;
    var to_y      = y;
    var to_x_next = x;
    var to_y_next = y;
    if      (direction == SokobanDirectionType.RIGHT) { to_x = x + 1; to_x_next = x + 2; }
    else if (direction == SokobanDirectionType.LEFT)  { to_x = x - 1; to_x_next = x - 2; }
    else if (direction == SokobanDirectionType.UP)    { to_y = y - 1; to_y_next = y - 2; }
    else                                              { to_y = y + 1; to_y_next = y + 2; }

    if (
      to_x < 0 ||
      to_y < 0 ||
      typeof(this.cells[to_y]) == 'undefined' ||
      typeof(this.cells[to_y][to_x]) == 'undefined'
    ) {
      return;
    }

    if (
      this.cells[to_y][to_x].visibleObject() == SokobanCellType.GROUND ||
      this.cells[to_y][to_x].visibleObject() == SokobanCellType.GOAL
    ) {
      this.steps += 1;
      this.saveHistory(direction);
      this.cells[y][x].entity       = SokobanCellType.GROUND;
      this.cells[to_y][to_x].entity = SokobanCellType.HERO;
      this.hero = this.cells[to_y][to_x];
      this.hero.options.direction = direction;
      this.checkSolved();
      this.onChangeCallback([[x,y], [to_x, to_y]]);
      return
    }

    if (
      this.cells[to_y][to_x].visibleObject() == SokobanCellType.BOX &&
      (
        this.cells[to_y_next][to_x_next].visibleObject() == SokobanCellType.GROUND ||
        this.cells[to_y_next][to_x_next].visibleObject() == SokobanCellType.GOAL
      )
    ) {
      this.steps += 1;
      this.saveHistory(direction);
      this.cells[y][x].entity                 = SokobanCellType.GROUND;
      this.cells[to_y][to_x].entity           = SokobanCellType.HERO;
      this.cells[to_y_next][to_x_next].entity = SokobanCellType.BOX
      this.hero = this.cells[to_y][to_x];
      this.hero.options.direction = direction;
      this.checkSolved();
      this.onChangeCallback([[x,y], [to_x, to_y], [to_x_next, to_y_next]]);
      return
    }
  }

  this.rollback = function() {
    if (this.solved || this.history.positions.length <= 0) {
      return;
    }
    var historyMap = this.history.positions.pop();
    this.cells  = historyMap.cells;
    this.hero   = this.cells[historyMap.heroY][historyMap.heroX];
    this.steps -= 1;
    this.onChangeCallback();
  }

  this.saveHistory = function(direction) {
    var historyMap = [];
    var line       = [];
    for (var y in this.cells) {
      line = [];
      for (var x in this.cells[y]) {
        line.push(this.cells[y][x].clone());
      }
      historyMap.push(line);
    }
    this.history.solution += direction;
    this.history.positions.push({cells: historyMap, heroX: this.hero.x, heroY: this.hero.y});
  }

  this.checkSolved = function() {
    this.solved = true;
    for (var y in this.cells) {
      for (var x in this.cells[y]) {
        if (this.cells[y][x].ground != SokobanCellType.GOAL && this.cells[y][x].entity == SokobanCellType.BOX) {
          this.solved = false;
          break;
        }
      }
    }

    if (gon.api_key && this.solved) {
      $.ajax({
        type: 'post',
        url: '/api/v1/level_solutions/',
        headers: { 'Authorization': gon.api_key },
        data: {level_id: this.level_id, solution : this.history.solution }
      });
    }
  }
}

var mapStore = new SokobanMapStore()
module.exports = mapStore;