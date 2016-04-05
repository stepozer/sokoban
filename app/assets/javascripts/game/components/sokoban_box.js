var SokobanCellImages = require('../stores/sokoban_cell_images_store');

module.exports = {
  draw: function(canvas, x, y, goal) {
    if (goal) {
      canvas.drawImage(SokobanCellImages.box_goal, x, y);
    } else {
      canvas.drawImage(SokobanCellImages.box, x, y);
    }
  }
};