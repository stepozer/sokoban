var SokobanCellType = require('../types/sokoban_cell_type');

function SokobanCellStore(ground, entity, x, y, options) {
  this.ground  = ground;
  this.entity  = entity;
  this.x       = x;
  this.y       = y;
  this.options = options || {};

  this.visibleObject = function() {
    if (this.entity != SokobanCellType.GROUND) {
      return this.entity;
    } else {
      return this.ground;
    }
  }

  this.clone = function() {
    return new SokobanCellStore(this.ground, this.entity, this.x, this.y, this.options);
  }
}

module.exports = SokobanCellStore;