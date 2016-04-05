var SokobanCellImages = require('../stores/sokoban_cell_images_store');

module.exports = {
  draw: function(canvas, x, y, direction) {
    if (direction == 'left') {
      canvas.drawImage(SokobanCellImages.hero_left, x, y);
    } else if (direction == 'right') {
      canvas.drawImage(SokobanCellImages.hero_right, x, y);
    } else if (direction == 'down') {
      canvas.drawImage(SokobanCellImages.hero_down, x, y);
    } else {
      canvas.drawImage(SokobanCellImages.hero_up, x, y);
    }
  }
};