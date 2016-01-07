var SokobanCellImages = require('../stores/sokoban_cell_images_store');

module.exports = {
  draw: function(ctx, x, y, cell_size, goal) {
    var img = new Image();
    if (goal) {
      img.src = img.src = SokobanCellImages.box_goal;
    } else {
      img.src = img.src = SokobanCellImages.box;
    }
    ctx.drawImage(img, x*cell_size,y*cell_size);
  }
};