var SokobanCellImages = require('../stores/sokoban_cell_images_store');

module.exports = {
  draw: function(ctx, x, y, cell_size) {
    var img = new Image();
    img.src = SokobanCellImages.wall;
    img.onload = function(){
      ctx.drawImage(img, x*cell_size,y*cell_size);
    }
  }
};