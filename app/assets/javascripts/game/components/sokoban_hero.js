var SokobanCellImages = require('../stores/sokoban_cell_images_store');

module.exports = {
  draw: function(ctx, x, y, cell_size, direction) {
    var img = new Image();
    if (direction == 'left') {
      img.src = SokobanCellImages.hero_left;
    } else if (direction == 'right') {
      img.src = SokobanCellImages.hero_right;
    } else if (direction == 'down') {
      img.src = SokobanCellImages.hero_down;
    } else {
      img.src = SokobanCellImages.hero_up;
    }
    img.onload = function(){
      ctx.drawImage(img, x*cell_size,y*cell_size, cell_size, cell_size);
    }
  }
};