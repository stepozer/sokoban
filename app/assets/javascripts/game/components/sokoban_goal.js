var SokobanCellImages = require('../stores/sokoban_cell_images_store');

module.exports = {
  draw: function(canvas, x, y) {
    canvas.drawImage(SokobanCellImages.goal, x, y)
  }
};