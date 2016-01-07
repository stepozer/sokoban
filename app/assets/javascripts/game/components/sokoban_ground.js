module.exports = {
  draw: function(ctx, x, y, cell_size) {
    ctx.fillStyle = "white";
    ctx.fillRect(x*cell_size,y*cell_size,cell_size,cell_size);
  }
};