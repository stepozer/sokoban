var CELL_SIZE = 30;

function SokobanCanvasStore() {
  this.imgStore = {}

  this.drawImage = function(path, x, y) {
    if (typeof(this.imgStore[path]) != 'undefined') {
      this.ctx.drawImage(this.imgStore[path], x*CELL_SIZE,y*CELL_SIZE);
    } else {
      var ctx = this.ctx;
      var img = new Image();
      img.src = path;
      img.onload = function(){
        ctx.drawImage(img, x*CELL_SIZE,y*CELL_SIZE);
      }
      this.imgStore[path] = img;
    }
  };

  this.drawBox = function(color, x, y) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
  };

  this.setCanvas = function(ctx) {
    this.ctx = ctx;
  }
}

var canvasStore = new SokobanCanvasStore();
module.exports = canvasStore;